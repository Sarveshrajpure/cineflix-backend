const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const addContentSchema = Joi.object({
  title: Joi.string().max(100).required(),
  desc: Joi.string().max(500),
  img: Joi.string(),
  imgTitle: Joi.string(),
  imgSm: Joi.string(),
  trailer: Joi.string(),
  video: Joi.string().allow(""),
  year: Joi.string(),
  limit: Joi.number(),
  genre: Joi.string(),
  isSeries: Joi.boolean(),
});

const updateContentSchema = Joi.object({
  id: Joi.objectId().required(),
  title: Joi.string().max(100).required(),
  desc: Joi.string().max(500),
  img: Joi.string(),
  imgTitle: Joi.string(),
  imgSm: Joi.string(),
  trailer: Joi.string(),
  video: Joi.string().allow(""),
  year: Joi.string(),
  limit: Joi.number(),
  genre: Joi.string(),
  isSeries: Joi.boolean(),
});

const deleteContentSchema = Joi.object({
  content_id: Joi.objectId().required(),
  isSeries: Joi.boolean().required(),
});

const ramdomContentSchema = Joi.object({
  contentType: Joi.string().max(20).required(),
});

module.exports = {
  addContentSchema,
  updateContentSchema,
  deleteContentSchema,
  ramdomContentSchema,
};
