const { Content } = require("../models/content");
const { Season } = require("../models/season");
const { Episode } = require("../models/episode");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const { deleteEpisodesBySesonId } = require("./episode.service");
const {
  findSeasonsByContentId,
  deleteSeasonsByContentId,
} = require("./season.service");
const {
  removeListItemByContentId,
  fetchListsByContentId,
  removeListItem,
} = require("./lists.service");

const addContent = async (
  title,
  desc,
  img,
  imgTitle,
  imgSm,
  trailer,
  video,
  year,
  limit,
  duration,
  genre,
  type
) => {
  if (await Content.titleTaken(title)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Content with this title already exists"
    );
  }
  try {
    const newContent = new Content({
      title,
      desc,
      img,
      imgTitle,
      imgSm,
      trailer,
      video,
      year,
      limit,
      duration,
      genre,
      type,
    });

    await newContent.save();

    return newContent;
  } catch (error) {
    throw error;
  }
};

const UpdateContent = async (
  id,
  title,
  desc,
  img,
  imgTitle,
  imgSm,
  trailer,
  video,
  year,
  limit,
  genre,
  type
) => {
  try {
    let updatedContent = await Content.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          desc,
          img,
          imgTitle,
          imgSm,
          trailer,
          video,
          year,
          limit,
          genre,
          type,
        },
      },
      { new: "true" }
    );

    return updatedContent;
  } catch (error) {
    throw error;
  }
};

const deleteContent = async (id, type) => {
  try {
    if (type === "series") {
      let findSeasons = await findSeasonsByContentId(id);

      for (let i = 0; i < findSeasons.length; i++) {
        deleteEpisodesBySesonId(findSeasons[i]._id);
      }

      let deleteSeasons = await deleteSeasonsByContentId(id);

      let getListsByContentId = await fetchListsByContentId(id);
      console.log(getListsByContentId);

      for (let i = 0; i < getListsByContentId.length; i++) {
        await removeListItem(getListsByContentId[i]._id, id);
      }

      let deletedContent = await Content.findByIdAndDelete(id);

      return deletedContent;
    }
    if (type === "movie") {
      let getListsByContentId = await fetchListsByContentId(id);
      console.log(getListsByContentId);

      for (let i = 0; i < getListsByContentId.length; i++) {
        await removeListItem(getListsByContentId[i]._id, id);
      }
      let deletedContent = await Content.findByIdAndDelete(id);

      console.log(removeListItem);
      return deletedContent;
    }
  } catch (error) {
    throw error;
  }
};

const randomContent = async (contentType) => {
  try {
    if (contentType == "series") {
      let content = await Content.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
      return content;
    }
    if (contentType == "movie") {
      let content = await Content.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);

      return content;
    }

    let content = await Content.aggregate([{ $sample: { size: 1 } }]);
    return content;
  } catch (error) {
    throw error;
  }
};

const getAllContent = async () => {
  try {
    let allContent = await Content.find();

    return allContent;
  } catch (error) {
    throw error;
  }
};

const getAllMovies = async () => {
  try {
    let allContent = await Content.find({ type: "movie" });

    return allContent;
  } catch (error) {
    throw error;
  }
};

const getAllSeries = async () => {
  try {
    let allContent = await Content.find({ type: "series" });

    return allContent;
  } catch (error) {
    throw error;
  }
};

const getContentById = async (id) => {
  try {
    let content = await Content.findById({ _id: id });

    return content;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addContent,
  UpdateContent,
  deleteContent,
  randomContent,
  getAllContent,
  getContentById,
  getAllMovies,
  getAllSeries,
};
