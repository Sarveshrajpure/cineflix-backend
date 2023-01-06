const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const addProfileSchema = Joi.object({
  name: Joi.string().max(50).required(),
  userId: Joi.objectId().required(),
  profilePic: Joi.string(),
});

const editProfileSchema = Joi.object({
  name: Joi.string().max(50),
  profileId: Joi.objectId().required(),
  profilePic: Joi.string().allow(""),
});

const deleteProfileSchema = Joi.object({
  name: Joi.string().max(50),
  profileId: Joi.objectId().required(),
  userId: Joi.objectId().required(),
  profilePic: Joi.string().allow(""),
});

const getProfileSchema = Joi.object({
  userId: Joi.objectId().required(),
});

const updateProfileHistorySchema = Joi.object({
  id: Joi.objectId().required(),
  contentId: Joi.objectId().required(),
  watchTime: Joi.number().max(10).required(),
  contentType: Joi.string().max(10).required(),})
  
const addToFavouriteSchema = Joi.object({
  profileId: Joi.objectId().required(),
  contentId: Joi.objectId().required(),
});

const removeFavouriteSchema = Joi.object({
  profileId: Joi.objectId().required(),
  contentId: Joi.objectId().required(),
});

module.exports = {
  addProfileSchema,
  editProfileSchema,
  getProfileSchema,
  deleteProfileSchema,
  updateProfileHistorySchema,
  addToFavouriteSchema,
  removeFavouriteSchema,
};
