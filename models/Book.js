const bodyParser = require('body-parser');
var mongodb = require('mongoose');

var bookSchema = mongodb.Schema({
  id: Number,
  title: String,
  author: String,
  genre: String,
  publishedYear: Number
});

var book_schema = mongodb.model('book',bookSchema);

module.exports = book_schema;