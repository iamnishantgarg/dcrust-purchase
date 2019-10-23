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
  ensureAdmin,
  ensureAuthenticated,
  adminController.getUpdateBudgetHead
);

router.post(
  "/updateBudgetHead",
  ensureAdmin,
  ensureAuthenticated,
  adminController.postUpdateBudgetHead
);

router.get(
  "/updateDepartment",
  ensureAdmin,
  ensureAuthenticated,
  adminController.getUpdateDepartment
);

router.post(
  "/updateDepartment",
  ensureAdmin,
  ensureAuthenticated,
  adminController.postUpdateDepartment
);

router.get(
  "/updateComment",
  ensureAdmin,
  ensureAuthenticated,
  adminController.getUpdateComment
);

router.post(
  "/updateComment",
  ensureAdmin,
  ensureAuthenticated,
  adminController.postUpdateComment
);

// router.get("/viewBudgetHead", adminController.getAddBudgetHead);

module.exports = router;
