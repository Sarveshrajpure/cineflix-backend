const { ApiError } = require("../middlewares/apiError");
const { contentService } = require("../services/");
const {
  addContentSchema,
  updateContentSchema,
  deleteContentSchema,
  ramdomContentSchema,
} = require("../validations/contentValidation");
const httpStatus = require("http-status");
require("dotenv").config();

const contentController = {
  async addNewContent(req, res, next) {
    try {
      let values = await addContentSchema.validateAsync(req.body);
      console.log(values);
      if (values) {
        let addedContent = await contentService.addContent(
          values.title,
          values.desc,
          values.img,
          values.imgTitle,
          values.imgsm,
          values.trailer,
          values.video,
          values.year,
          values.limit,
          values.genre,
          values.isSeries
        );

        res.status(httpStatus.CREATED).send(addedContent);
      }
    } catch (error) {
      next(error);
    }
  },

  async updateContent(req, res, next) {
    try {
      let values = await updateContentSchema.validateAsync(req.body);

      if (values) {
        let updatedContent = await contentService.UpdateContent(
          values.id,
          values.title,
          values.desc,
          values.img,
          values.imgTitle,
          values.imgsm,
          values.trailer,
          values.video,
          values.year,
          values.limit,
          values.genre,
          values.isSeries
        );
        res.status(httpStatus.OK).send(updatedContent);
      }
    } catch (error) {
      next(error);
    }
  },

  async deleteContent(req, res, next) {
    try {
      let values = await deleteContentSchema.validateAsync(req.body);

      if (values) {
        let deletedContent = await contentService.deleteContent(
          values.content_id,
          values.isSeries
        );

        if (deletedContent == null) {
          res
            .status(httpStatus.OK)
            .send({ message: "Content with this id does not exist!" });
        } else {
          res
            .status(httpStatus.OK)
            .send({ message: "Content has been deleted!" });
        }
      }
    } catch (error) {
      next(error);
    }
  },

  async getAllContent(req, res, next) {
    try {
      let content = await contentService.getAllContent();

      res.status(httpStatus.OK).send(content.reverse());
    } catch (error) {
      next(error);
    }
  },
  async getRandomContent(req, res, next) {
    try {
      let values = await ramdomContentSchema.validateAsync(req.body);

      if (values) {
        let content = await contentService.randomContent(values.contentType);

        res.status(httpStatus.OK).send(content);
      }
    } catch (error) {
      next(error);
    }
  },
};
module.exports = contentController;
