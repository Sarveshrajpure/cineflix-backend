const express = require("express");
const profileController = require("../controllers/profile.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

//api/user/addprofile
// router.post("/addprofile", profileController.AddProfile);

module.exports = router;
