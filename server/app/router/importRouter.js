// const upload = require("../config/upload_multer");
const ImportController = require("../controller/ImportController");

const router = require("express").Router();

router.post("/add", ImportController.add);
router.get("/getAll", ImportController.getAll);
// router.put(
//   "/update/:id",
//   upload.single("pr_image"),
//   productController.updatePro
// );
router.get("/getImport/:id", ImportController.getproImport);

module.exports = router;
