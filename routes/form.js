const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const formController = require("../controller/form");

router.get("/newForm", ensureAuthenticated, formController.getNewForm);

router.post("/newForm", ensureAuthenticated, formController.postNewForm);
router.post("/changeId", ensureAuthenticated, formController.postChangeId);

router.get(
  "/waitingForApproval/:id",
  ensureAuthenticated,
  formController.getSingleForm
);

router.get(
  "/viewFormWaitingForApproval/:id/comments/new",
  ensureAuthenticated,
  formController.getWaitingForApproval
);
router.post(
  "/viewFormWaitingForApproval/:id/comments",
  ensureAuthenticated,
  formController.postWaitingForApproval
);

router.post("/pdfRoute/:id", formController.postPDF);

router.get("/queries", formController.getQueries);
router.post("/queries", formController.postQueries);
module.exports = router;
