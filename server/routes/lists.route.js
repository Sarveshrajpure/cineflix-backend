const express = require("express");
const listsController = require("../controllers/lists.controller");
const { adminAuth, auth } = require("../middlewares/auth");
const router = express.Router();

//api/lists/addlist
router.post("/addlist", adminAuth(), listsController.addNewList);

// api/lists/updatelist;
router.put("/updatelist", adminAuth(), listsController.updateList);

// api/lists/additem;
router.put("/additem", adminAuth(), listsController.addListItem);

// api/lists/removeitem;
router.post("/removeitem", adminAuth(), listsController.removeListItem);

//api/lists/deletelist
router.post("/deletelist", adminAuth(), listsController.deleteList);

//api/lists/getlist
router.get("/getlists", auth(), listsController.getAllList);

//api/lists/getlistbyid
router.get("/getlistbyid/:id", adminAuth(), listsController.getListById);

module.exports = router;
