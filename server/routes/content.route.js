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
router.get("/getall", auth(), contentController.getAllContent);

//api/content/get
router.get("/get/:id", auth(), contentController.getContent);

//api/content/randomcontent
router.get("/randomcontent", auth(), contentController.getRandomContent);

//api/content/getallmovies
router.get("/getallmovies", adminAuth(), contentController.getMovies);

//api/content/getallseries
router.get("/getallseries", adminAuth(), contentController.getSeries);

module.exports = router;
