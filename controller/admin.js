var Form = require("../models/forms");
var BudgetHead = require("../models/budgetHead");
var Department = require("../models/deparment");
var Comment = require("../models/comment");

exports.getAdminDashboard = (req, res, next) => {
  res.render("adminDash");
};
exports.getUpdateBudgetHead = (req, res, next) => {
  BudgetHead.find()
    .then(lst => {
      res.render("updateBudgetHead", { budgetHeads: lst });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postUpdateBudgetHead = (req, res, next) => {
  var { budgetHeads, newBudgetHead, heads } = req.body;
  BudgetHead.find().then(lst => {
    var result = lst;
    result.forEach(i => {
      i.isActive = false;
    });
    result.forEach(i => i.save());
  });

  setTimeout(() => {
    if (budgetHeads) {
      budgetHeads.forEach(element => {
        BudgetHead.findOne({ _id: element }, (err, budgetHead) => {
          budgetHead.isActive = true;
          budgetHead.save();
        });
      });
    }
    if (newBudgetHead) {
      var b = new BudgetHead({ budgetHeadName: newBudgetHead });
      b.save(err => {
        console.log(err);
      });
    }
    setTimeout(() => {
      res.redirect("/adminDash");
    }, 10000);
  }, 6000);
};

exports.getUpdateDepartment = (req, res, next) => {
  Department.find()
    .then(lst => {
      res.render("updateDepartment", { Departments: lst });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postUpdateDepartment = (req, res, next) => {
  var { departments, newDepartment } = req.body;
  Department.find().then(lst => {
    var result = lst;
    result.forEach(i => {
      i.isActive = false;
    });
    result.forEach(i => i.save());
  });

  setTimeout(() => {
    if (departments) {
      departments.forEach(element => {
        Department.findOne({ _id: element }, (err, department) => {
          department.isActive = true;
          department.save();
        });
      });
    }
    if (newDepartment) {
      var b = new Department({ departmentName: newDepartment });
      b.save(err => {
        console.log(err);
      });
    }
    setTimeout(() => {
      res.redirect("/adminDash");
    }, 10000);
  }, 6000);
};

exports.getUpdateComment = (req, res, next) => {
  Comment.find()
    .then(lst => {
      res.render("updateComment", { Comments: lst });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postUpdateComment = (req, res, next) => {
  var { comments, newComment } = req.body;
  Comment.find().then(lst => {
    var result = lst;
    result.forEach(i => {
      i.isActive = false;
    });
    result.forEach(i => i.save());
  });

  setTimeout(() => {
    if (comments) {
      comments.forEach(element => {
        Comment.findOne({ _id: element }, (err, comment) => {
          comment.isActive = true;
          comment.save();
        });
      });
    }
    if (newComment) {
      var b = new Comment({ commentName: newComment });
      b.save(err => {
        console.log(err);
      });
    }
    setTimeout(() => {
      res.redirect("/adminDash");
    }, 10000);
  }, 6000);
};
