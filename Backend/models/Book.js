var mongodb = require('mongoose');

var bookSchema = mongodb.Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  price: Number,
  category: String,
  coverImage: String,
  downloadLink: String,
  stock: Number
}, { timestamps: true });

var book_schema = mongodb.model('book',bookSchema);

module.exports = book_schema;