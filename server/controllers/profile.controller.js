const { ApiError } = require("../middlewares/apiError");
const { profileService } = require("../services/");
const {
  addProfileSchema,
  editProfileSchema,
  getProfileSchema,
} = require("../validations/profileValidations");
const httpStatus = require("http-status");
require("dotenv").config();

const profileController = {
  async GetProfile(req, res, next) {
    try {
      let values = await getProfileSchema.validateAsync(req.body);

      if (values) {
        let getProfiles = await profileService.getProfiles(values.userId);
        res.status(httpStatus.OK).send(getProfiles);
      }
    } catch (error) {
      next(error);
    }
  },
  async AddProfile(req, res, next) {
    let values = await addProfileSchema.validateAsync(req.body);

    if (values) {
      let profile = await profileService.addProfile(values.name, values.userId);

      if (profile == false) {
        res.status(httpStatus.OK).send("Profile already exists!");
      } else {
        res.status(httpStatus.CREATED).send(profile);
      }
    }
    try {
    } catch (error) {
      next(error);
    }
  },
  async EditProfile(req, res, next) {
    try {
      let values = await editProfileSchema.validateAsync(req.body);

      if (values) {
        let editProfile = await profileService.editProfile(values);

        if (editProfile) {
          res.status(httpStatus.OK).send(editProfile);
        } else {
          res.status(httpStatus.OK).send(editProfile);
        }
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = profileController;
