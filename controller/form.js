const SentBackForm = require("../models/sentBack"),
  Forms = require("../models/forms");

exports.getNewForm = (req, res, next) => {
  res.render("newForm", {});
};
exports.postNewForm = (req, res, next) => {
  console.log("Hey");
  const {
    field1,
    quantity,
    budgetHead,
    cost,
    nameOfIndenter,
    departmentOfIndenter,
    fileId,
    date
  } = req.body;
  console.log(req.body);
  console.log("Hey");
  const newForm = new Forms({
    field1,
    quantity,
    budgetHead,
    cost,
    nameOfIndenter,
    departmentOfIndenter,
    fileId,
    date
  });
  newForm
    .save()
    .then(form => {
      console.log(form);
      console.log("Heyyyyy");
      res.redirect("/dashboard");
    })
    .catch(err => console.log(err));
};
exports.getWaitingForApproval = (req, res, next) => {
  Forms.find({}, function(err, foundForms) {
    console.log(foundForms);
    res.render("waitingForApproval", { foundForms: foundForms });
  });
};
exports.getSingleForm = (req, res, next) => {
  Forms.findById(req.params.id)
    .populate("logs")
    .exec(function(err, foundForm) {
      if (err) {
        console.log(err);
      } else {
        res.render("viewFormWaitingForApproval", { foundForm: foundForm });
        console.log(foundForm);
      }
    });
};

exports.getQueries = (req, res, next) => {
  res.render("queries", { files: [] });
};

exports.postQueries = (req, res, next) => {
  var { fileId, department, date, cost } = req.body;
  var fil = {};
  if (fileId) {
    fil.fileId = fileId;
  }
  if (department) {
    fil.departmentOfIndenter = department;
  }
  if (cost) {
    fil.cost = { $lte: cost };
  }
  if (date) {
    fil.date = { $lte: date };
  }
  Forms.find(fil).then(files => {
    console.log(files);
    return res.render("queries", { files: files });
  });
};

exports.postChangeId = (req, res, next) => {
  const { fileId, newFileId } = req.body;
  Forms.findOne({ fileId: fileId }).then(file => {
    console.log(file);
    file.fileId = newFileId;
    file.approved = true;
    file.rejected = false;
    file.save(f => {
      console.log(f);
      res.redirect("/dashboard");
    });
  });
};
exports.getWaitingForApproval = (req, res, next) => {
  Forms.findById(req.params.id, function(err, foundForm) {
    if (err) {
      console.log(err);
    } else {
      res.render("newLog", { foundForm: foundForm });
    }
  });
};
exports.postWaitingForApproval = (req, res, next) => {
  Forms.findById(req.params.id, function(err, foundForm) {
    console.log("Here");
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      Log.create(
        {
          department: req.body.department,
          date: req.body.date,
          comment: req.body.comment
        },
        function(err, comment) {
          if (err) {
            console.log(err);
          } else {
            foundForm.logs.push(comment);
            console.log("comment = " + comment);
            if (comment.comment === "Reject") {
              console.log("rejected");
              foundForm.rejected = true;
              foundForm.approved = false;
            }
            foundForm.save();
            res.redirect("/dashboard");
          }
        }
      );
    }
  });
};
