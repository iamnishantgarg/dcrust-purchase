var mongoose = require("mongoose");

var budgetHeadSchema = new mongoose.Schema({
  budgetHeadName: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("BudgetHead", budgetHeadSchema);
