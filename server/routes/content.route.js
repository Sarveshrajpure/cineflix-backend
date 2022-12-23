const express = require("express");
const contentController = require("../controllers/content.controller");
const { adminAuth, auth } = require("../middlewares/auth");
const router = express.Router();

//api/content/addcontent
router.post("/addcontent", adminAuth(), contentController.addNewContent);

//api/content/updatecontent
router.put("/updatecontent", adminAuth(), contentController.updateContent);

//api/content/deletecontent
router.post("/deletecontent", adminAuth(), contentController.deleteContent);

//api/content/getall
router.post("/getall", auth(), contentController.getAllContent);

//api/content/get
router.get("/get/:id", auth(), contentController.getContent);

//api/content/randomcontent
router.get("/randomcontent", auth(), contentController.getRandomContent);

module.exports = router;
