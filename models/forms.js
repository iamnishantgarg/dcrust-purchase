var mongoose = require("mongoose");

var formSchema = new mongoose.Schema({
  field1: { type: String, required: true },
  field2: String,
  quantity: Number,
  field4: String,
  availBalance: { type: Number, required: true },
  cost: { type: Number, required: true },
  field7: String,
  field8: String,
  field9: String,
  field10: String,
  fileId: { type: String, required: true }
});

module.exports = mongoose.model("Tempform", formSchema);
