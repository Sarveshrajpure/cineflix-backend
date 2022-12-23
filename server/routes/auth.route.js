const express = require("express");
const authController = require("../controllers/auth.controller");
const { adminAuth, auth } = require("../middlewares/auth");
const router = express.Router();

//api/auth/register
router.post("/register", authController.register);

//api/auth/signin
router.post("/signin", authController.signin);

//api/auth/getstats
router.get("/getstats", adminAuth(), authController.getUserStats);

//api/auth/isauth
router.get("/isauth", auth(), authController.isauth);

//api/auth/isauth
router.get("/isauthadmin", adminAuth(), authController.isauth);

module.exports = router;
