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
  budgetHeadRoutes = require("./routes/budgetHead"),
  adminRoutes = require("./routes/admin"),
  Log = require("./models/logs"),
  pdfMake = require("./pdfmake/pdfmake"),
  vfsFonts = require("./pdfmake/vfs_fonts");

const { ensureAuthenticated } = require("./config/auth");
(formRoutes = require("./routes/form")), (Form = require("./models/forms"));
require("./config/passport")(passport);
const MongoURI =
  "mongodb+srv://neildahiya:abcdefg@cluster0-cjlhb.mongodb.net/dcrust_final?retryWrites=true&w=majority";

mongoose.connect(MongoURI, { useNewUrlParser: true });

//pdf fonts
pdfMake.vfs = vfsFonts.pdfMake.vfs;

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
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(Layouts);

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.isAuth = req.isAuthenticated();
  next();
});

app.use(formRoutes);
app.use(departmentRoutes);
app.use(adminRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res, next) => {
  res.render("home");
});

app.listen(PORT, function() {
  console.log(`listening to port:${PORT}`);
});
