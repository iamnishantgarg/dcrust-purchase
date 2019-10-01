const router = require("express").Router();
const authController = require("../controller/auth");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");

router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);
router.get("/login", authController.getLogin);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logOut();
  req.flash("success_msg", "Successfully logged out");
  res.redirect("/auth/login");
});

module.exports = router;
