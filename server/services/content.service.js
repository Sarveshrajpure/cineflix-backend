const { Content } = require("../models/content");
const { Season } = require("../models/season");
const { Episode } = require("../models/episode");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");

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
      console.log("in series");
    }
    if (type === "movie") {
      let deletedContent = await Content.findByIdAndDelete(id);

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
};
