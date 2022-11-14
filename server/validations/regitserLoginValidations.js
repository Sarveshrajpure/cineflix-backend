const Joi = require("@hapi/joi");
const CONSTANTS = require("../constants/Constants");

const stringPassswordError = new Error(
  "Password must be 6 characters,must have 1 upper case alphabet, 1 lower case alphabet, 1 digit, 1 special character"
);

const registerSchema = Joi.object({
  email: Joi.string().email().max(225).required(),
  password: Joi.string()
    .regex(CONSTANTS.APP_VALIDATIONS.strongPasswordRegex)
    .error(stringPassswordError)
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().max(225).required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
