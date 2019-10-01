const BudgetHead = require("../models/budgetHead");

exports.getDashboard = (req, res, next) => {
  res.render("dashboard");
};

exports.getViewBudgetHead = (req, res, next) => {
  // var departments=[];
  BudgetHead.find().then(budgetHeadList => {
    console.log(budgetHeadList);
    res.render("viewBudgetHead", { budgetHeads: budgetHeadList });
  });
  //   res.render("viewDepartment");
};
exports.getAddBudgetHead = (req, res, next) => {
  res.render("addBudgetHead");
};
exports.postAddBudgetHead = (req, res, next) => {
  const { budgetHeadName, isActive} = req.body;
  BudgetHead.findOne({budgetHeadName: budgetHeadName}).then(headName => {
    if (headName) {
      console.log("alreadyExist");
      res.redirect("/");
    } else {
      new BudgetHead({budgetHeadName, isActive})
        .save()
        .then(() => {
          console.log(isActive);
          console.log(budgetHeadName);
          console.log("added successfully");
          res.redirect("/viewBudgetHead");
        })
        .catch(err => console.log(err));
    }
  });
};