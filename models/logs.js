var mongoose = require("mongoose");

var logSchema = mongoose.Schema({
  department: String,
  date: Date,
  comment: String
});
module.exports = mongoose.model("Logs", logSchema);
