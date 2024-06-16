const upload = require("../config/upload_multer");
const productController = require("../controller/productController");

const router = require("express").Router();

router.post("/add", upload.single("pr_image"), productController.add);
router.get("/getAll", productController.getAllPro);
router.put(
  "/update/:id",
  upload.single("pr_image"),
  productController.updatePro
);
router.get("/getAllPro/:id", productController.getProductCate);
router.get("/getProtype/:id", productController.getProtype);
router.get("/getAlltype/:id", productController.getAlltype);
router.get("/searchProduct/:id", productController.searchProduct);
module.exports = router;
