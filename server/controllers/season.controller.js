const { ApiError } = require("../middlewares/apiError");
const {
  addSeasonSchema,
  getAllSeasonsSchema,
  deleteSeasonsSchema,
} = require("../validations/seasonValidation");
const { seasonService, episodeService } = require("../services");
const httpStatus = require("http-status");
require("dotenv").config();

const seasonController = {
  async addSeason(req, res, next) {
    try {
      let values = await addSeasonSchema.validateAsync(req.body);

      if (values) {
        let addedSeason = await seasonService.createSeason(
          values.contentId,
          values.title
        );

        res.status(httpStatus.CREATED).send(addedSeason);
      }
    } catch (error) {
      next(error);
    }
  },
  async getAllSeasons(req, res, next) {
    try {
      let values = await getAllSeasonsSchema.validateAsync(req.body);
      if (values) {
        let seasons = await seasonService.findSeasonsByContentId(
          values.contentId
        );

        res.status(httpStatus.OK).send(seasons);
      }
    } catch (error) {
      next(error);
    }
  },

  async deleteSeason(req, res, next) {
    try {
      let values = await deleteSeasonsSchema.validateAsync(req.body);
      if (values) {
        // Deleting all episode for this season first
        let deletedEpisode = await episodeService.deleteEpisodesBySesonId(
          values.seasonId
        );
        // Deleting season
        if (
          deletedEpisode.deletedCount > 0 ||
          deletedEpisode.acknowledged === true
        ) {
          let deletedSeason = await seasonService.deleteSeasonById(
            values.seasonId
          );

          if (deletedSeason.deletedCount > 0) {
            res
              .status(httpStatus.OK)
              .send({ message: "Season and episodes deleted!" });
          }

          if (
            deletedSeason.acknowledged === true &&
            deletedSeason.deletedCount === 0
          ) {
            res
              .status(httpStatus.OK)
              .send({ message: "Season with this id may not exist!" });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = seasonController;
