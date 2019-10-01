const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const formController = require("../controller/form");

router.get("/newForm", formController.getNewForm);

router.post("/newForm", formController.postNewForm);
router.post("/changeId", formController.postChangeId);

router.get("/waitingForApproval/:id", formController.getSingleForm);

router.get(
  "/viewFormWaitingForApproval/:id/comments/new",
  formController.getWaitingForApproval
);
router.post(
  "/viewFormWaitingForApproval/:id/comments",
  formController.postWaitingForApproval
);

router.get("/queries", formController.getQueries);
router.post("/queries", formController.postQueries);
module.exports = router;
