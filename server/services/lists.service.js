const { List } = require("../models/list");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");

const createList = async (title, type, genre, content) => {
  try {
    if (await List.titleTaken(title)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "List with this title already exists"
      );
    }
    const newList = new List({ title, type, genre, content });

    await newList.save();

    return newList;
  } catch (error) {
    throw error;
  }
};

const deleteList = async (id) => {
  try {
    let deletedList = await List.deleteOne({ _id: id });

    return deletedList;
  } catch (error) {
    throw error;
  }
};

const getLists = async (contentType, genreType) => {
  try {
    if (contentType) {
      if (genreType) {
        let lists = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: contentType, genre: genreType } },
        ]);
        return lists;
      } else {
        let lists = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: contentType } },
        ]);
        return lists;
      }
    } else {
      let lists = await List.aggregate([{ $sample: { size: 10 } }]);
      return lists;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { createList, deleteList, getLists };
