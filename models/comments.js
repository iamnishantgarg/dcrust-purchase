var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  content: { type: String, required: true }
});

module.exports = mongoose.model("Comments", commentSchema);
