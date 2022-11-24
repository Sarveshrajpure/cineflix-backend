const express = require("express");
const listsController = require("../controllers/lists.controller");
const { adminAuth, auth } = require("../middlewares/auth");
const router = express.Router();

//api/content/addlist
router.post("/addlist", adminAuth(), listsController.addNewList);

//api/content/updatelist
// router.put("/updatelist", adminAuth(), listsController.updateList);

//api/content/deletelist
router.delete("/deletelist", adminAuth(), listsController.deleteList);

//api/content/getlist
router.get("/getlists", auth(), listsController.getAllList);

module.exports = router;
