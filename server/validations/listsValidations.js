const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const addListSchema = Joi.object({
  title: Joi.string().max(100).required(),
  type: Joi.string().required(),
  genre: Joi.string().max(50).required(),
  content: Joi.array().items(Joi.objectId()),
});

const editListSchema = Joi.object({
  id: Joi.objectId().required(),
  title: Joi.string().max(100).required(),
  genre: Joi.string().max(50).required(),
  content: Joi.array().items(Joi.objectId()),
});

const addListItemSchema = Joi.object({
  id: Joi.objectId().required(),
  content: Joi.array().items(Joi.objectId()),
});

const removeListItemSchema = Joi.object({
  id: Joi.objectId().required(),
  contentId: Joi.objectId().required(),
});

const deleteListSchema = Joi.object({
  id: Joi.objectId().required(),
});

const getListSchema = Joi.object({
  contentType: Joi.string().max(50).allow(""),
  genreType: Joi.string().max(50).allow(""),
});

const getListByIdSchema = Joi.object({
  id: Joi.objectId().required(),
});
module.exports = {
  addListSchema,
  editListSchema,
  deleteListSchema,
  getListSchema,
  addListItemSchema,
  removeListItemSchema,
  getListByIdSchema,
};
