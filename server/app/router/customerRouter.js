const customerController = require("../controller/customerController");
const { customer } = require("../model");

const router = require("express").Router();

router.post("/add", customerController.addCus);
router.get("/getAll", customerController.getAllCus);
router.get("/:id", customerController.getByID);
router.put("/update/:id", customerController.update);

module.exports = router;
