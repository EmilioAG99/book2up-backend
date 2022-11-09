const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const index = require("./index.js");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//conexión con mongodb
mongoose.connect('mongodb+srv://demo:admin123@cluster0.8y2sb.mongodb.net/book2up?retryWrites=true&w=majority',{useNewUrlParser: true,  useUnifiedTopology: true})
    .then(db => console.log('Connected to database'))
    .catch((error)=> console.log(error.message));

app.use(index);

app.listen(3000, () => {
    console.log("El servidor está corriendo");
});