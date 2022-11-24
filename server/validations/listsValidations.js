const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const addListSchema = Joi.object({
  title: Joi.string().max(100).required(),
  type: Joi.string().required(),
  genre: Joi.string().max(50).required(),
  content: Joi.array().items(Joi.objectId()),
});

const deleteListSchema = Joi.object({
  id: Joi.objectId().required(),
});

const getListSchema = Joi.object({
  contentType: Joi.string().max(50).allow(""),
  genreType: Joi.string().max(50).allow(""),
});

module.exports = { addListSchema, deleteListSchema, getListSchema };
