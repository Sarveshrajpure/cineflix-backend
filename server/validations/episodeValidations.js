const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const addEpisodeSchema = Joi.object({
  title: Joi.string().max(100).required(),
  desc: Joi.string().max(200),
  video: Joi.string(),
  seasonId: Joi.objectId().required(),
});

const editEpisodeSchema = Joi.object({
  id: Joi.objectId().required(),
  title: Joi.string().max(100).required(),
  desc: Joi.string().max(200).required(),
  video: Joi.string().required(),
});

const deleteEpisodeSchema = Joi.object({
  id: Joi.objectId().required(),
});

const getAllEpisodesSchema = Joi.object({
  seasonId: Joi.objectId().required(),
});
module.exports = {
  addEpisodeSchema,
  editEpisodeSchema,
  deleteEpisodeSchema,
  getAllEpisodesSchema,
};
