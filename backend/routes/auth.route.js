const express = require("express");
const controller = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", controller.signup);

router.post("/login", controller.login);

router.post("/logout", controller.logout);

module.exports = router;