var mongodb = require('mongoose');

var userSchema =  mongodb.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

var user_schema = mongodb.model('user',userSchema);

module.exports = user_schema;
