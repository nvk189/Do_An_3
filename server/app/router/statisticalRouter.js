const static = require("../controller/statisticalController");
const { supp } = require("../model");

const router = require("express").Router();

router.get("/getstatic", static.callStoredProcedure);
router.get("/getdate", static.callTotalDate);
router.get("/getproductHot", static.callProductHot);
router.get("/getAllcheck", static.getAllcheck);
router.get("/getSales", static.callProductSales);
router.put("/updatstatus", static.updateStatus);

module.exports = router;
