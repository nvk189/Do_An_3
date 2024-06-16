const categoryController = require("../controller/categoryController");
const { category } = require("../model");

const router = require("express").Router();

router.post("/add", categoryController.add);
router.get("/getAll", categoryController.getAll);
router.get("/:id", categoryController.getByID);
router.put("/update/:id", categoryController.update);

module.exports = router;
