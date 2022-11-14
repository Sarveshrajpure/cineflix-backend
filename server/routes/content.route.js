const express = require("express");
const contentController = require("../controllers/content.controller");
const { adminAuth, auth } = require("../middlewares/auth");
const router = express.Router();

//api/content/addcontent
router.post("/addcontent", adminAuth(), contentController.addNewContent);

//api/content/updatecontent
router.put("/updatecontent", adminAuth(), contentController.updateContent);

//api/content/deletecontent
router.delete("/deletecontent", adminAuth(), contentController.deleteContent);

//api/content/getall
router.get("/getall", adminAuth(), contentController.getAllContent);

//api/content/randomcontent
router.get("/randomcontent", auth(), contentController.getRandomContent);

module.exports = router;
