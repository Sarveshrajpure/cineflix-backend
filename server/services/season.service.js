const httpStatus = require("http-status");
const { ApiError } = require("../middlewares/apiError");
const { Season } = require("../models/season");

const createSeason = async (contentId, title) => {
  try {
    if (await Season.titleTaken(title)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Season already exists");
    }

    let newSeason = new Season({ contentId, title });

    await newSeason.save();

    return newSeason;
  } catch (error) {
    throw error;
  }
};

const findSeasonsByContentId = async (contentId) => {
  try {
    let findSeasons = await Season.find({ contentId: contentId });

    return findSeasons;
  } catch (error) {
    throw error;
  }
};

const deleteSeasonById = async (id) => {
  try {
    let deletedSeasons = await Season.deleteOne({ _id: id });

    return deletedSeasons;
  } catch (error) {
    throw error;
  }
};

const deleteSeasonsByContentId = async (id) => {
  try {
    let deletedSeasons = await Season.deleteMany({ contentId: id });

    return deletedSeasons;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSeason,
  findSeasonsByContentId,
  deleteSeasonById,
  deleteSeasonsByContentId,
};
