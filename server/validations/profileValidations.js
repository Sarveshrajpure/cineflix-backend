const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const addProfileSchema = Joi.object({
  name: Joi.string().max(50).required(),
  userId: Joi.objectId().required(),
  profilePic: Joi.string(),
});

const editProfileSchema = Joi.object({
  name: Joi.string().max(100),
  profileId: Joi.objectId().required(),
  profilePic: Joi.string().allow(""),
});

const deleteProfileSchema = Joi.object({
  name: Joi.string().max(100),
  profileId: Joi.objectId().required(),
  userId: Joi.objectId().required(),
  profilePic: Joi.string().allow(""),
});

const getProfileSchema = Joi.object({
  userId: Joi.objectId().required(),
});

module.exports = {
  addProfileSchema,
  editProfileSchema,
  getProfileSchema,
  deleteProfileSchema,
};
