var adminController = require("../controller/admin");
const router = require("express").Router();

router.get("/adminDash", adminController.getAdminDashboard);

router.get("/addBudgetHead", adminController.getAddBudgetHead);

router.get("/viewBudgetHead", adminController.getAddBudgetHead);

module.exports = router;
