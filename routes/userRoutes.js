const express = require("express");
const cart = require ("../schemas/cartmodel");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const books = require("../schemas/bookmodel");
router.use(requireAuth);
//Informacion de incio de sesion

router.get("/cartdata", async (req, res) => {
  const infocart = await cart.findOne({ username: req.user.user });
  if (infocart) {
    res.send(infocart.libros);
  } else {
    res.send([]);
  }
});

//agregar libros
router.post("/agregar", async (req, res) => {
  const { titulo, autor, sin, precio, SKU, img } = req.body;

  let book = await books.findOne({ SKU });
  if (!book) {
    book = new books({
      titulo,
      autor,
      sin,
      precio,
      SKU,
      img,
    });
    try {
      await book.save();
      res.send("Libro agregado");
    } catch (error) {
      res.status(200).send("Libro ya existente");
    }
  } else {
    res.status(200).send("Libro ya existente");
  }
});

router.post("/agregar-csv", async (req, res) => {
  const libros= req.body;
  await books.collection.insertMany(libros).then(function(){
        res.send("Insertados")
    }).catch(function(error){
      res.status(400).send(error)   // Failure
    });
  
});

//agregar carrito
router.post("/a-carrito", async (req, res) => {
  const currentuser = req.session.idUsuario;
  let usercart = await cart.findOne({ username: currentuser });

  if (!usercart) {
    usercart = new cart({
      username: currentuser,
      libros: [
        {
          SKU: codigo,
          titulo: nombre,
          cantidad: 1,
          total: money,
        },
      ],
    });
    await usercart.save();
  } else {
    let kart = usercart.libros;
    let idLibro = await Object.values(kart);
    let idLibro2 = await idLibro.find((element) => element.SKU === codigo);

    if (idLibro2 === undefined) {
      kart.push({ SKU: codigo, titulo: nombre, cantidad: 1, total: money });
      cart.updateOne(
        { username: currentuser },
        { $set: { libros: kart } },
        function (err, res) {
          if (err) throw err;
          console.log("Se actualizo el carrito");
        }
      );
    } else {
      var i;
      var updatedKart = [];
      for (i = 0; i < kart.length; i++) {
        if (kart[i].titulo === idLibro2.titulo) {
          idLibro2.cantidad = idLibro2.cantidad + 1;
          idLibro2.total = idLibro2.cantidad * money;
          updatedKart.push(idLibro2);
        } else {
          updatedKart.push(kart[i]);
        }
      }
      cart.updateOne(
        { username: currentuser },
        { $set: { libros: updatedKart } },
        function (err, res) {
          if (err) throw err;
          console.log("Se actualizo el carrito");
        }
      );
    }
  }
  try {
    res.redirect("/libros");
    console.log("Libro agregado al carrito");
  } catch (error) {
    console.log(error);
    res.status(500).send("Algo salio mal");
  }
});

// pagar (vaciar carrito)
router.post("/pagar", async (req, res) => {
  const currentuser = req.session.idUsuario;
  let usercart = await cart.deleteOne({ username: currentuser });
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect("/pagar");
      }
      res.clearCookie("sid");
      res.redirect("/");
      console.log("La sesion se ha cerrado y carrito vaciado");
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;