const express = require("express");
const profileController = require("../controllers/profile.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

//api/user/addprofile
router.post("/addprofile", auth(), profileController.AddProfile);

//api/user/getprofile
router.post("/getprofile", auth(), profileController.GetProfile);

//api/user/editprofile
router.post("/editprofile", auth(), profileController.EditProfile);

module.exports = router;
