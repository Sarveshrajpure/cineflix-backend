const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const addSeasonSchema = Joi.object({
  contentId: Joi.objectId().required(),
  title: Joi.string().max(100).required(),
});

const getAllSeasonsSchema = Joi.object({
  contentId: Joi.objectId().required(),
});

const getSeasonByIdSchema = Joi.object({
  id: Joi.objectId().required(),
});

const deleteSeasonsSchema = Joi.object({
  seasonId: Joi.objectId().required(),
});
module.exports = {
  addSeasonSchema,
  getAllSeasonsSchema,
  getSeasonByIdSchema,
  deleteSeasonsSchema,
};
