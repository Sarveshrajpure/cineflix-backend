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
  limit: Joi.string().max(10),
  duration: Joi.string().max(10).allow(""),
  genre: Joi.string(),
  type: Joi.string().max(10),
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
  limit: Joi.string().max(10),
  duration: Joi.string().max(10).allow(""),
  genre: Joi.string(),
  type: Joi.string().max(10),
});

const deleteContentSchema = Joi.object({
  content_id: Joi.objectId().required(),
  type: Joi.string().max(10),
});

const ramdomContentSchema = Joi.object({
  contentType: Joi.string().max(20),
});

const getContentSchema = Joi.object({
  id: Joi.objectId().required(),
});

module.exports = {
  addContentSchema,
  updateContentSchema,
  deleteContentSchema,
  ramdomContentSchema,
  getContentSchema,
};
