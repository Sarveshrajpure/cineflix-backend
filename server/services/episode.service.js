const { Episode } = require("../models/episode");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");

const createEpisode = async (title, desc, video, seasonId) => {
  try {
    if (await Episode.titleTaken(title)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Episode with this title already exists!"
      );
    }

    let newEpisode = new Episode({ title, desc, video, seasonId });
    newEpisode.save();
    return newEpisode;
  } catch (error) {
    throw error;
  }
};

const getAllEpisodesBySeasonId = async (seasonId) => {
  try {
    let findEpisodes = await Episode.find({ seasonId });
    return findEpisodes;
  } catch (error) {
    throw error;
  }
};

const updateEpisode = async (id, title, desc, video) => {
  try {
    let updatedEpisode = await Episode.updateOne(
      { _id: id },
      { $set: { title, desc, video } }
    );
    return updatedEpisode;
  } catch (error) {
    throw error;
  }
};

const deleteEpisodeById = async (id) => {
  try {
    let deletedEpisode = await Episode.deleteOne({ _id: id });
    return deletedEpisode;
  } catch (error) {
    throw error;
  }
};

const deleteEpisodesBySesonId = async (seasonId) => {
  try {
    let deletedEpisode = await Episode.deleteMany({ seasonId: seasonId });
    console.log(deletedEpisode);
    return deletedEpisode;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createEpisode,
  updateEpisode,
  deleteEpisodesBySesonId,
  deleteEpisodeById,
  getAllEpisodesBySeasonId,
};
