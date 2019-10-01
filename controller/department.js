const Department = require("../models/departments");

exports.getDashboard = (req, res, next) => {
  res.render("dashboard");
};

exports.getViewDepartment = (req, res, next) => {
  // var departments=[];
  Department.find().then(departmentsList => {
    console.log(departmentsList);
    res.render("viewDepartment", { departments: departmentsList });
  });
  //   res.render("viewDepartment");
};
exports.getAddDepartment = (req, res, next) => {
  res.render("addDepartment");
};
exports.postAddDepartment = (req, res, next) => {
  const { departmentName, isActive } = req.body;
  //console.log(req.body);
    
    
    
    
  Department.findOne({ departmentName: departmentName, isActive: isActive }).then(department => {
    if (department) {
      console.log("alreadyExist");
      res.redirect("/");
    } else {
      new Department({ departmentName, isActive})
        .save()
        .then(() => {
          console.log(isActive);
          console.log(departmentName);
          console.log("department added successfully");
          res.redirect("/viewDepartment");
        })
        .catch(err => console.log(err));
    }
  });
};
