const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const addSeasonSchema = Joi.object({
  contentId: Joi.objectId().required(),
  title: Joi.string().max(100).required(),
});

module.exports = { addSeasonSchema };
