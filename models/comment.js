var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  commentName: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Comments", commentSchema);
