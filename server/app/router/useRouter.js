const useController = require("../controller/UserController");
const { user } = require("../model");

const router = require("express").Router();

router.get("/getAll", useController.getAll);

module.exports = router;
