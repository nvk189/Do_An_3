const orderController = require("../controller/orderController");
const router = require("express").Router();

router.post("/add", orderController.add);
router.get("/getID/:id", orderController.getByID);
router.get("/getReal", orderController.orderReal);
router.get("/getFail", orderController.orderFail);
router.get("/getShip", orderController.orderShip);
router.get("/getOrder", orderController.totalOrder);
router.put("/updateReal", orderController.updateReal);
router.put("/updateFail", orderController.updateFail);
router.put("/updateOrder/:id", orderController.updateOrder);
router.get("/orderCus/:id", orderController.getCusID);

module.exports = router;
