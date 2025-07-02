var mongodb = require('mongoose');

var bookSchema = mongodb.Schema({
  title: { type: String, required: true },         // Required
  author: { type: String, required: true },        // Required
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  stock: { type: Number, required: true, min: 1  }
}, { timestamps: true });

var book_schema = mongodb.model('book',bookSchema);

module.exports = book_schema;