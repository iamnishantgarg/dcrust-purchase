const router = require("express").Router();
const { ensureAuthenticated } = require("../config/auth");
const departmentController = require("../controller/department");

router.get("/viewDepartment", departmentController.getViewDepartment);

router.get("/addDepartment", departmentController.getAddDepartment);

router.get(
  "/dashboard",

  departmentController.getDashboard
);

router.post("/addDepartment", departmentController.postAddDepartment);

module.exports = router;
