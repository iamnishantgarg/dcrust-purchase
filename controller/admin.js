var Form = require("../models/forms");

exports.getAdminDashboard = (req, res, next) => {
  res.render("adminDash");
};
exports.getAddBudgetHead = (req, res, next) => {
  res.render("addBudgetHead");
};

exports.getViewBudgetHead = (req, res, next) => {
  res.render("viewBudgetHead");
};
