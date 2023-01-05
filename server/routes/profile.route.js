const express = require("express");
const profileController = require("../controllers/profile.controller");
const { auth } = require("../middlewares/auth");
const router = express.Router();

//api/profile/addprofile
router.post("/addprofile", auth(), profileController.AddProfile);

//api/profile/getprofile
router.post("/getprofile", auth(), profileController.GetProfile);

//api/profile/editprofile
router.post("/editprofile", auth(), profileController.EditProfile);

//api/profile/deleteprofile
router.post("/deleteprofile", auth(), profileController.DeleteProfile);

module.exports = router;
