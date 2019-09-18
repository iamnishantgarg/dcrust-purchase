const express = require("express"),
  app = express(),
  Department = require("./models/departments"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  seedDB = require("./seed"),
  PORT = process.env.PORT || 5000,
  Forms = require("./models/forms")
  Layouts = require("express-ejs-layouts"),
  SentBackForm = require("./models/sentBack");


//Department.remove();
mongoose.connect(
  "mongodb+srv://neildahiya:abcdefg@cluster0-cjlhb.mongodb.net/temp1?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(Layouts);
// app.use(Layouts);
//seedDB();

app.get("/newForm", function(req, res) {
  res.render("newForm");
});
app.post("/newForm", function(req, res) {
  //console.log(req.body);
  const {field1, field2,quantity,field3,field4,availBalance,cost,field7,field8, field9, field10, fileId} = req.body;
  const newForm = new Forms({field1, field2,quantity,field3,field4,availBalance,cost,field7,field8, field9, field10, fileId});
  newForm.save().then(form=>{
    console.log(form);
    res.redirect("/");
  }).catch(err=>console.log(err));
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

  var name = req.body.deptName;
  var dep = {
    name: name
  };
  Department.create(dep, function(err, depart) {
    if (err) {
      console.log(err);
    } else {
      console.log(depart);
      res.redirect("/");
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
      res.render("viewDep", {departments: allDeps});
    }
  });
});


/////////////////////////////                  Waiting for Approval Routes                      /////////////////////////////////

app.get("/waitingForApproval", function(req, res){
  Forms.find({}, function(err, foundForms){
    console.log(foundForms);
    res.render("waitingForApproval", {foundForms: foundForms});
  });
});

app.get("/waitingForApproval/:id", function(req, res) {
  Forms.findById(req.params.id, function(err, foundForm) {
    if(err){
      console.log(err)
  }else{
      res.render("viewFormWaitingForApproval", {foundForm: foundForm});
  }
  });
  
});


/////////////////////////////                  Sent Back Routes                      /////////////////////////////////
app.get("/sentBack",(req, res)=>{
  SentBackForm.find({}, function(err, foundForms){
    res.render("sentBack", {foundForms: foundForms});
  });
});

app.get("/sentBack/:id", function(req, res){
  SentBackForm.findById(req.params.id, function(err, foundForm) {
    if(err){
      console.log(err)
  }else{
      res.render("viewSentBackForm", {foundForm: foundForm});
  }
  });
});

//Create new Sent Back form
app.post("/sentBack", (req, res)=>{
  const {field1, field2,quantity,field3,field4,availBalance,cost,field7,field8, field9, field10, fileId, comments} = req.body;
  const newSentBackForm = new SentBackForm({field1, field2,quantity,field3,field4,availBalance,cost,field7,field8, field9, field10, fileId, comments});
  Forms.deleteOne({fileId: fileId}, function(err){
    if(err){console.log(err);}else{
      res.redirect("/sentBack");
    }
    
  });
  //console.log(fileId);
  
  newSentBackForm.save().then(form=>{
    console.log(form);
    res.redirect("/");
  }).catch(err=>console.log(err));
});



//Auth Routes
app.get("/login", function(req, res){
  res.render("login");
});

app.get("/", function(req, res) {
  res.render("home");
});

app.listen(PORT, function() {
  
  console.log(`listening to port:${PORT}`);
});


