var adminController = require("../controller/admin");
var { ensureAuthenticated, ensureAdmin } = require("../config/auth");
var BudgetHead = require("../models/budgetHead");
const router = require("express").Router();

router.get(
  "/adminDash",
  ensureAdmin,
  ensureAuthenticated,
  adminController.getAdminDashboard
);

router.get(
  "/updateBudgetHead",
  ensureAuthenticated,
  adminController.getUpdateBudgetHead
);

router.post(
  "/updateBudgetHead",
  ensureAuthenticated,
  adminController.postUpdateBudgetHead
);

router.get(
  "/updateDepartment",
  ensureAuthenticated,
  adminController.getUpdateDepartment
);

router.post(
  "/updateDepartment",
  ensureAuthenticated,
  adminController.postUpdateDepartment
);

router.get(
  "/updateComment",
  ensureAuthenticated,
  adminController.getUpdateComment
);

router.post(
  "/updateComment",
  ensureAuthenticated,
  adminController.postUpdateComment
);

// router.get("/viewBudgetHead", adminController.getAddBudgetHead);

module.exports = router;
