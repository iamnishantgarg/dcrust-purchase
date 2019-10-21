var Form = require("../models/forms");
var BudgetHead = require("../models/budgetHead");
var Department = require("../models/deparment");
var Comment = require("../models/comment");
var async = require("async");
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
  console.log(budgetHeads);

  BudgetHead.find()
    .then(heads => {
      async.each(
        heads,
        (head, cb) => {
          head.isActive = false;
          head.save(cb);
        },
        err => {
          console.log(err);
          if (budgetHeads) {
            async.each(
              budgetHeads,
              (head, cb) => {
                BudgetHead.findOne({ _id: head }).then(h => {
                  h.isActive = true;
                  h.save(cb);
                });
              },
              err => {
                console.log(err);

                if (newBudgetHead) {
                  var b = new BudgetHead({ budgetHeadName: newBudgetHead });
                  b.save(err => {
                    console.log(err);
                  });
                }
                res.redirect("/adminDash");
              }
            );
          } else {
            if (newBudgetHead) {
              var b = new BudgetHead({ budgetHeadName: newBudgetHead });
              b.save(err => {
                console.log(err);
              });
            }
            res.redirect("/adminDash");
          }
        }
      );
    })
    .catch(err => console.log(err));
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
  Department.find()
    .then(depts => {
      async.each(
        depts,
        (dept, cb) => {
          dept.isActive = false;
          dept.save(cb);
        },
        err => {
          console.log(err);
          if (departments) {
            async.each(
              departments,
              (dept, cb) => {
                Department.findOne({ _id: dept }).then(d => {
                  d.isActive = true;
                  d.save(cb);
                });
              },
              err => {
                console.log(err);

                if (newDepartment) {
                  var b = new Department({ departmentName: newDepartment });
                  b.save(err => {
                    console.log(err);
                  });
                }
                res.redirect("/adminDash");
              }
            );
          } else {
            if (newDepartment) {
              var b = new Department({ departmentName: newBudgetHead });
              b.save(err => {
                console.log(err);
              });
            }
            res.redirect("/adminDash");
          }
        }
      );
    })
    .catch(err => console.log(err));
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

  Comment.find()
    .then(cmnts => {
      async.each(
        cmnts,
        (cmnt, cb) => {
          cmnt.isActive = false;
          cmnt.save(cb);
        },
        err => {
          console.log(err);
          if (comments) {
            async.each(
              comments,
              (cmnt, cb) => {
                Comment.findOne({ _id: cmnt }).then(c => {
                  c.isActive = true;
                  c.save(cb);
                });
              },
              err => {
                console.log(err);

                if (newComment) {
                  var b = new Comment({ commentName: newComment });
                  b.save(err => {
                    console.log(err);
                  });
                }
                res.redirect("/adminDash");
              }
            );
          } else {
            if (newComment) {
              var b = new Comment({ commentName: newComment });
              b.save(err => {
                console.log(err);
              });
            }
            res.redirect("/adminDash");
          }
        }
      );
    })
    .catch(err => console.log(err));

  // Comment.find()
  //   .then(lst => {
  //     async.each(
  //       lst,
  //       (cmnt, cb) => {
  //         cmnt.isActive = false;
  //         cmnt.save(cb);
  //       },
  //       err => {
  //         console.log(err);
  //         if (comments) {
  //           async.each(
  //             comments,
  //             (comment, cb) => {
  //               Comment.findOne({ _id: comment }).then(cmnt => {
  //                 cmnt.isActive = true;
  //                 cmnt.save(cb);
  //               });
  //             },
  //             err => {
  //               console.log(err);
  //               if (newComment) {
  //                 var b = new Comment({ commentName: newComment });
  //                 b.save(err => {
  //                   console.log(err);
  //                 });
  //               }
  //               res.redirect("/adminDash");
  //             }
  //           );
  //         } else {
  //           if (newComment) {
  //             var b = new Comment({ commentName: newComment });
  //             b.save(err => {
  //               console.log(err);
  //             });
  //           }
  //           res.redirect("/adminDash");
  //         }
  //       }
  //     );
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};
