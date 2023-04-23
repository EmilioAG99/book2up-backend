const express = require("express");
const cart = require("../schemas/cartmodel");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const books = require("../schemas/newbookmodel");
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
  const { titulo, autor, sin, precio, SKU, img, disponible } = req.body;

  let book = await books.findOne({ SKU });
  if (!book) {
    book = new books({
      titulo,
      autor,
      sin,
      precio,
      SKU,
      img,
      disponibles: disponible,
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
//
//actualizar stock
router.post("/update-book", async (req, res) => {
  const { SKU, cantidad } = req.body;
  let libro = await books.findOne({ SKU });
  if (!libro) {
    res.send("No se encontro el libro");
  } else {
    try {
      libro.disponibles = cantidad;
      await libro.save();
      res.send("Se actualizo tu libro");
    } catch (e) {
      res.send(e);
    }
  }
});
//actualizar stock
router.post("/delete-book", async (req, res) => {
  const { SKU } = req.body;
  let libro = await books.findOne({ SKU });
  if (!libro) {
    res.send("No se encontro el libro");
  } else {
    try {
      await libro.deleteOne({ _id: libro._id });
      res.send("Se elimino con exito");
    } catch (e) {
      res.send(e);
    }
  }
});

//
router.post("/agregar-csv", async (req, res) => {
  const libros = req.body;
  await books.collection
    .insertMany(libros)
    .then(function () {
      res.send("Insertados");
    })
    .catch(function (error) {
      res.status(400).send(error); // Failure
    });
});

//agregar carrito
router.post("/purchase", async (req, res) => {
  const currentuser = req.user.user;
  const newPurchase = req.body;
  let usercart = await cart.findOne({ username: currentuser });

  if (!usercart) {
    const newCart = [newPurchase];
    usercart = new cart({
      username: currentuser,
      compras: newCart,
    });
    await usercart.save();
    res.send("Compra completada con exito");
  } else {
    cart.updateOne(
      { username: currentuser },
      { $set: { compras: [...usercart.compras, newPurchase] } },
      function (err, res) {
        if (err) {
          res.status(400).send(err);
        }
      }
    );
    res.send("Compra completada con exito");
  }
});

router.get("/purchase-history", async (req, res) => {
  const currentuser = req.user.user;
  let userCart = await cart.findOne({ username: currentuser });
  if (!userCart) {
    res.send([]);
  } else {
    res.send(userCart.compras);
  }
});

module.exports = router;
