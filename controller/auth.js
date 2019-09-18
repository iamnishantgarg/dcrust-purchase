const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcryptjs");

exports.getRegister = (req, res, next) => {
  res.render("signup");
};
exports.postRegister = (req, res, next) => {
  const { email, password, phone, name } = req.body;
  console.log(email);
  let errors = [];
  if (!name || !password || !phone || !email) {
    errors.push({ msg: "plz fill out all fields" });
  }
  if (errors.length > 0) {
    res.render("signup", {
      errors,
      name,
      email,
      password,
      phone
    });
  } else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          console.log("this email already exist");
          errors.push({ msg: "this email alredy exist" });
          res.render("signup", {
            errors,
            name,
            email,
            password,
            phone
          });
        } else {
          const newUser = new User({
            name,
            email,
            password,
            phone
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  console.log("resgistered successfully");
                  req.flash(
                    "success_msg",
                    "you are now registered and can login"
                  );
                  res.redirect("/auth/login");
                })
                .catch(err => {
                  console.log(err);
                  console.log("error occurred");
                  req.flash(
                    "error_msg",
                    "some unexpected error occur plz register again"
                  );
                  res.redirect("/auth/register");
                });
            });
          });
        }
      })
      .catch(err => console.log(err));
  }
};

exports.getLogin = (req, res, next) => {
  res.render("login");
};
