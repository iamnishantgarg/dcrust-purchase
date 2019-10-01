var mongoose = require("mongoose");

var formSchema = new mongoose.Schema({
  field1: { type: String, required: true },
  quantity: Number,
  budgetHead: String,
  cost: { type: Number, required: true },
  nameOfIndenter: String,
  departmentOfIndenter: String,
  approved: { type: Boolean, default: false },
  rejected: { type: Boolean, default: false },
  fileId: { type: String, required: true, unique: true },
  date: { type: Date },
  logs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Logs"
    }
  ]
});

module.exports = mongoose.model("Tempform", formSchema);
