var express = require("express");

var router = express.Router();

var homeController = require("../controllers/home.controller");

router.get("/home", homeController.home);
router.get("/about", homeController.about);

module.exports = router;
