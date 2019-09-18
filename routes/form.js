const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const formController = require("../controller/form");

router.get("/newForm", ensureAuthenticated, formController.getNewForm);

router.post("/newForm", ensureAuthenticated, formController.postNewForm);

router.get(
  "/waitingForApproval",
  ensureAuthenticated,
  formController.getWaitingForApproval
);
router.get(
  "/waitingForApproval/:id",
  ensureAuthenticated,
  formController.getSingleForm
);

router.get("/sentBack", ensureAuthenticated, formController.getSentBack);

router.get(
  "/sentBack/:id",
  ensureAuthenticated,
  formController.getSingleSentForm
);
router.post("/sentBack", ensureAuthenticated, formController.postSentBack);

module.exports = router;
