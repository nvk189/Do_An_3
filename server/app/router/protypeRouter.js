const protypeController = require("../controller/proypeController");
const { protype } = require("../model");

const router = require("express").Router();

router.post("/add", protypeController.add);
router.get("/getAll", protypeController.getAll);
router.get("/:id", protypeController.getByID);
router.put("/update/:id", protypeController.update);

module.exports = router;
