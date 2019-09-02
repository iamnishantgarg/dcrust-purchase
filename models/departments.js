var mongoose = require("mongoose");

var departmentSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model("Department", departmentSchema);