const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const departmentController = require("../controller/department");

router.get(
  "/viewDepartment",
  ensureAuthenticated,
  departmentController.getViewDepartment
);

router.get(
  "/addDepartment",
  ensureAuthenticated,
  departmentController.getAddDepartment
);

router.get(
  "/dashboard",

  ensureAuthenticated,
  departmentController.getDashboard
);

router.post(
  "/addDepartment",
  ensureAuthenticated,
  departmentController.postAddDepartment
);

module.exports = router;
