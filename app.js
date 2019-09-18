const express = require("express"),
  app = express(),
  Department = require("./models/departments"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  seedDB = require("./seed"),
  PORT = process.env.PORT || 5000,
  Layouts = require("express-ejs-layouts"),
  authRoutes = require("./routes/auth"),
  session = require("express-session"),
  flash = require("connect-flash"),
  departmentRoutes = require("./routes/department"),
  passport = require("passport"),
  formRoutes = require("./routes/form");
require("./config/passport")(passport);
const MongoURI =
  "mongodb+srv://owner:owner@123@cluster0-hfi0g.mongodb.net/purchase?retryWrites=true&w=majority";

mongoose.connect(MongoURI, { useNewUrlParser: true });

// sessions
app.use(
  session({
    secret: "keysecret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// flash messages
app.use(flash());

app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(Layouts);
//seedDB();

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.isAuth = req.isAuthenticated();

  next();
});

// app.get("/newForm", function(req, res) {
//   res.render("newForm");
// });
// app.post("/newForm", function(req, res) {
//   console.log(req.body);
// });

// app.get("/existing", function(req, res) {
//   res.render("existing");
// });
app.use(formRoutes);
app.use(departmentRoutes);
app.use("/auth", authRoutes);
app.get("/", function(req, res) {
  res.render("home");
});

app.listen(PORT, function() {
  console.log(`listening to port:${PORT}`);
});
