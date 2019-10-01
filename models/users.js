var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  phone: Number,
  name: String
});
module.exports = mongoose.model("User", UserSchema);
