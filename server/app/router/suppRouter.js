const suppController = require("../controller/suppController");
const { supp } = require("../model");

const router = require("express").Router();

router.post("/add", suppController.add);
router.get("/getAll", suppController.getAll);
router.get("/:id", suppController.getByID);
router.put("/update/:id", suppController.update);

module.exports = router;
