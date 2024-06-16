const express = require("express");
const authController = require("../controllers/auth.controller");
const verifyUser = require("../common/verifyUser");

module.exports = (app) => {
  app.post("/register", authController.register);
  app.post("/login", authController.login);
  app.get("/logout", authController.logout);
  app.get("/", verifyUser, authController.verifyUser);
};
