const { Schema, model } = require("mongoose");

const booksSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  sin: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  SKU: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  disponibles: {
    type: Number,
    required: false,
  },
  num_pages: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    required: false,
  },
  count_rating: {
    type: String,
    required: false,
  },
  genre: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: false,
  },
});

module.exports = model("newbooks", booksSchema);
