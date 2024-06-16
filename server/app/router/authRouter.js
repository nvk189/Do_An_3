const express = require("express");
const router = express.Router();
const auth = require("../controller/authcontroller");
const verifyUser = require("../config/verifyUser");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/logout", auth.logout);
router.get("/", verifyUser, auth.verifyUser);

module.exports = router;
