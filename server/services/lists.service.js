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

const fetchListById = async (id) => {
  try {
    let list = await List.findById(id);
    return list;
  } catch (error) {
    throw error;
  }
};

const fetchListsByContentId = async (contentId) => {
  try {
    let lists = await List.find({ content: contentId });
    return lists;
  } catch (error) {
    throw error;
  }
};

const editList = async (id, title, genre, content) => {
  try {
    let getListContent = await List.findById(id);
    let previouslyAvailableContent = getListContent.content;
    let length = previouslyAvailableContent.length;
    let arrayToBeUpdated = previouslyAvailableContent;

    let contentAlreadyExists = false;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < content.length; j++) {
        if (previouslyAvailableContent[i] === content[j]) {
          contentAlreadyExists = true;
        } else {
          contentAlreadyExists = false;
        }
      }
    }

    if (!contentAlreadyExists) {
      let editedList = await List.updateOne(
        { _id: id },

        { $set: { title, genre, content: arrayToBeUpdated } }
      );
      return editedList;
    } else {
      let editedList = await List.updateOne(
        { _id: id },
        { $set: { title, genre } }
      );
      return editedList;
    }
  } catch (error) {
    throw error;
  }
};

const addListItem = async (id, content) => {
  try {
    let getListContent = await List.findById(id);
    let previouslyAvailableContent = getListContent.content;
    let length = previouslyAvailableContent.length;

    let existingitems = [];

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < content.length; j++) {
        if (previouslyAvailableContent[i] === content[j]) {
          existingitems.push(content[j]);
        }
      }
    }

    if (existingitems.length === 0) {
      let editedList = await List.updateOne(
        { _id: id },
        { $push: { content: { $each: content } } }
      );
      return editedList;
    } else {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Following content already exists: ${existingitems}`
      );
    }
  } catch (error) {
    throw error;
  }
};

const removeListItem = async (id, contentId) => {
  try {
    let removeItem = await List.updateOne(
      { _id: id },
      { $pull: { content: contentId } }
    );

    return removeItem;
  } catch (error) {
    throw error;
  }
};

const removeListItemByContentId = async (contentId) => {
  try {
    let removeItem = await List.updateOne({ $pull: { content: contentId } });

    return removeItem;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createList,
  deleteList,
  getLists,
  editList,
  addListItem,
  removeListItem,
  fetchListById,
  removeListItemByContentId,
  fetchListsByContentId,
};
