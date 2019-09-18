module.exports = {
  ensureAuthenticated: function(req, res, next) {
    console.log(req.isAuthenticated);
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("error_msg", "please login first");
      res.redirect("/auth/login");
    }
  }
};
