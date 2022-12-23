const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const { episodeService } = require("../services/");
const {
  addEpisodeSchema,
  editEpisodeSchema,
  deleteEpisodeSchema,
  getAllEpisodesSchema,
} = require("../validations/episodeValidations");

const episodeController = {
  async addEpisode(req, res, next) {
    try {
      let values = await addEpisodeSchema.validateAsync(req.body);

      if (values) {
        let addedEpisode = await episodeService.createEpisode(
          values.title,
          values.desc,
          values.video,
          values.seasonId
        );

        res.status(httpStatus.CREATED).send(addedEpisode);
      }
    } catch (error) {
      next(error);
    }
  },

  async updateEpisode(req, res, next) {
    try {
      let values = await editEpisodeSchema.validateAsync(req.body);

      if (values) {
        let updatedEpisode = await episodeService.updateEpisode(
          values.id,
          values.title,
          values.desc,
          values.video
        );

        if (updatedEpisode.modifiedCount > 0) {
          res
            .status(httpStatus.OK)
            .send({ mesage: "Episode updated successfully!" });
        }
      }
    } catch (error) {
      next(error);
    }
  },
  async deleteEpisode(req, res, next) {
    try {
      let values = await deleteEpisodeSchema.validateAsync(req.body);

      if (values) {
        let deletedEpisode = await episodeService.deleteEpisodeById(values.id);

        if (deletedEpisode.deletedCount > 0) {
          res.status(httpStatus.OK).send({ mesage: "Episode deleted!" });
        }
        if (
          deletedEpisode.acknowledged === true &&
          deletedEpisode.deletedCount === 0
        ) {
          res
            .status(httpStatus.BAD_REQUEST)
            .send({ mesage: "Episode with this id may not exist!" });
        }
      }
    } catch (error) {
      next(error);
    }
  },

  async getAllEpisodes(req, res, next) {
    try {
      let values = await getAllEpisodesSchema.validateAsync(req.body);

      if (values) {
        let allEpisodes = await episodeService.getAllEpisodesBySeasonId(
          values.seasonId
        );

        res.status(httpStatus.OK).send(allEpisodes);
      }
    } catch (error) {
      next(error);
    }
  },
};
module.exports = episodeController;
