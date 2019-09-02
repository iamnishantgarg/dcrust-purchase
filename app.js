const express = require("express"),
  app = express(),
  Department = require("./models/departments"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  seedDB = require("./seed"),
  PORT = process.env.PORT || 5000,
  Layouts = require("express-ejs-layouts");

mongoose.connect(
  "mongodb+srv://neildahiya:abcdefg@cluster0-cjlhb.mongodb.net/temp1?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
// app.use(Layouts);
//seedDB();

app.get("/newForm", function(req, res) {
  res.render("newForm");
});
app.post("/newForm", function(req, res) {
  console.log(req.body);
});

app.get("/existing", function(req, res) {
  res.render("existing");
});

//Departments
//add new Dep
app.get("/newDepartment", function(req, res) {
  res.render("newDepartment");
});
app.post("/newDepartment", function(req, res) {
  var name = req.body.name;
  var dep = {
    name: name
  };
  Department.create(dep, function(err, depart) {
    if (err) {
      console.log(err);
    } else {
      console.log(depart);
    }
  });
  res.redirect("/");
});
//view all departments
app.get("/viewDep", function(req, res) {
  Department.find({}, function(err, allDeps) {
    if (err) {
      console.log(err);
    } else {
      res.render("viewDep", { departments: allDeps });
    }
  });
});

app.get("/", function(req, res) {
  res.render("home");
});

app.listen(PORT, function() {
  console.log(`listening to port:${PORT}`);
});
