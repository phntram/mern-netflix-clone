const express = require("express");
const controller = require("../controllers/auth.controller");
const protectRoute = require("../middleware/protectRoute.js");
const router = express.Router();

router.post("/signup", controller.signup);

router.post("/login", controller.login);

router.post("/logout", controller.logout);

router.get("/authCheck", protectRoute, controller.authCheck);

module.exports = router;