const express = require("express");
const episodeController = require("../controllers/episode.controller");
const { adminAuth, auth } = require("../middlewares/auth");
const router = express.Router();

//api/episode/addepisode
router.post("/addepisode", adminAuth(), episodeController.addEpisode);

//api/episode/updateepisode
router.put("/updateepisode", adminAuth(), episodeController.updateEpisode);

//api/episode/addepisode
router.post("/deleteEpisode", adminAuth(), episodeController.deleteEpisode);

//api/episode/getall
router.post("/getall", auth(), episodeController.getAllEpisodes);

module.exports = router;
