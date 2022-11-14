const { ApiError } = require("../middlewares/apiError");
const { User } = require("../models/user");
const { authService, userService, profileService } = require("../services/");
const {
  registerSchema,
  loginSchema,
} = require("../validations/regitserLoginValidations");
const httpStatus = require("http-status");
require("dotenv").config();

const authController = {
  async register(req, res, next) {
    try {
      //validating using joi

      let value = await registerSchema.validateAsync(req.body);

      if (value) {
        //chechking if email is taken
        if (await User.emailTaken(value.email)) {
          throw new ApiError(httpStatus.BAD_REQUEST, "User already exists!");
        }

        let user = await authService.createUser(value.email, value.password);

        // Creating a default profile for user

        let defaultProfile = { name: "me", userId: user._id };

        let profile = await profileService.createProfile(defaultProfile);

        res.status(httpStatus.CREATED).send({
          user,
          profile,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async signin(req, res, next) {
    try {
      //validating user login data using joi
      let value = await loginSchema.validateAsync(req.body);

      if (value) {
        const user = await authService.signInEmailAndPassword(
          value.email,
          value.password
        );

        //setting access token
        let token = await authService.genAuthToken(user);

        let { password, ...user_info } = user._doc;
        res
          .cookie("x-access-token", token, {
            expires: authService.setExpiry(7),
          })
          .status(httpStatus.OK)
          .send(user_info);
      }
    } catch (error) {
      next(error);
    }
  },
  async isauth(req, res, next) {
    let auth = req.authenticated;
    console.log(auth);

    let _id = auth.id;
    let user = await userService.findUserById(_id);

    if (auth && user) {
      res.status(httpStatus.OK).send(user);
    }
  },
};
module.exports = authController;
