var mongoose = require("mongoose");

var departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Department", departmentSchema);
