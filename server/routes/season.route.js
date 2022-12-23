const express = require("express");
const seasonController = require("../controllers/season.controller");
const { adminAuth, auth } = require("../middlewares/auth");
const router = express.Router();

//api/season/addseason
router.post("/addseason", adminAuth(), seasonController.addSeason);

//api/season/getall
router.get("/getall", auth(), seasonController.getAllSeasons);

//api/season/deleteseason
router.delete("/deleteseason", adminAuth(), seasonController.deleteSeason);

module.exports = router;
