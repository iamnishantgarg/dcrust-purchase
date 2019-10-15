const SentBackForm = require("../models/sentBack"),
  Forms = require("../models/forms"),
  BudgetHead = require("../models/budgetHead"),
  Department = require("../models/deparment"),
  Comment = require("../models/comment");
Log = require("../models/logs");

exports.getNewForm = (req, res, next) => {
  BudgetHead.find({ isActive: true }, (err, budgetHeads) => {
    Department.find({ isActive: true }, (err, departments) => {
      res.render("newForm", { budgetHeads, departments });
    });
  });
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
      Department.find({ isActive: true }, (err, departments) => {
        Comment.find({ isActive: true }, (err, comments) => {
          res.render("newLog", { foundForm, departments, comments });
        });
      });
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

exports.postPDF = (req, res, next) => {
  var logArr = [];

  Form.findById(req.params.id, function(err, foundForm) {
    for (var i = 0; i < foundForm.logs.length; i++) {
      Log.findById(foundForm.logs[i]._id, function(err, result) {
        var arr = [];
        arr.push(result.date.toString().substring(0, 15));
        arr.push(result.department);
        arr.push(result.comment);

        logArr.push(arr);
      });
    }
    logArr.unshift([
      { text: "Date", style: "tableHeader" },
      { text: "Department", style: "tableHeader" },
      { text: "Comment", style: "tableHeader" }
    ]);
    setTimeout(function() {
      var dd = {
        footer: {
          columns: ["Left part", { text: "Right part", alignment: "right" }],
          margin: [5, 2, 10, 20]
        },
        content: [
          {
            text: "DCRUST Purchase Department\n\n",
            style: "header",
            alignment: "center"
          },
          {
            text: "File ID : " + foundForm.fileId,
            alignment: "center",
            fontSize: 14,
            bold: true,
            margin: [0, 20, 0, 8]
          },
          {
            //style: "tableExample",

            table: {
              headerRows: 1,
              width: [200, 200, 200],
              alignment: "center",
              body: logArr,
              style: "table"
            }
            // layout: "headerLineOnly"
          }
        ],
        styles: {
          table: {
            alignment: "center"
          }
        }
      };
      const pdfDoc = pdfMake.createPdf(dd);
      pdfDoc.getBase64(data => {
        res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; "filename.pdf"'
        });
        const download = Buffer.from(data.toString("utf-8"), "base64");
        res.end(download);
      });
    }, 1 * 1000);
  });
  // setTimeout(function() {
  //   console.log(logArr + " =  heyyyyyy ");
  //   // this code will only run when time has ellapsed
  // }, 4 * 1000);
};
