module.exports = {
  ensureAuthenticated: function(req, res, next) {
    console.log(req.isAuthenticated);
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("error_msg", "please login first");
      res.redirect("/auth/login");
    }
  },
  ensureAdmin: (req, res, next) => {
    console.log(req.session.isAdmin);
    if (req.session.isAdmin) {
      return next();
    } else {
      req.flash("error_msg", "You are not admin");
      res.redirect("/dashboard");
    }
  }
};
