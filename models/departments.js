var mongoose = require("mongoose");

var departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true }
});

module.exports = mongoose.model("Department", departmentSchema);
