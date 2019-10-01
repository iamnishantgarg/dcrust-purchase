var mongoose = require("mongoose");

var budgetHeadSchema = new mongoose.Schema({
  budgetHeadName: { type: String, required: true },
  isActive: {type: Boolean}
});

module.exports = mongoose.model("BudgetHead", budgetHeadSchema);
