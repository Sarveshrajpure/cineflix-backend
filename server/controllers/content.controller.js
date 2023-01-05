const { ApiError } = require("../middlewares/apiError");
const { contentService } = require("../services/");
const {
  addContentSchema,
  updateContentSchema,
  deleteContentSchema,
  ramdomContentSchema,
  getContentSchema,
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
          values.imgSm,
          values.trailer,
          values.video,
          values.year,
          values.limit,
          values.duration,
          values.genre,
          values.type
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
          values.imgSm,
          values.trailer,
          values.video,
          values.year,
          values.limit,
          values.duration,
          values.genre,
          values.type
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
          values.type
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

      res.status(httpStatus.OK).send(content);
    } catch (error) {
      next(error);
    }
  },
  async getRandomContent(req, res, next) {
    try {
      let values = await ramdomContentSchema.validateAsync({
        contentType: req.query.contentType,
      });

      if (values) {
        let content = await contentService.randomContent(values.contentType);

        res.status(httpStatus.OK).send(content);
      }
    } catch (error) {
      next(error);
    }
  },
  async getContent(req, res, next) {
    try {
      let values = await getContentSchema.validateAsync({ id: req.params.id });

      if (values) {
        let content = await contentService.getContentById(values.id);

        res.status(httpStatus.OK).send(content);
      }
    } catch (error) {
      next(error);
    }
  },

  async getMovies(req, res, next) {
    try {
      let fetchAllMovies = await contentService.getAllMovies();

      res.status(httpStatus.OK).send(fetchAllMovies);
    } catch (error) {
      next(error);
    }
  },

  async getSeries(req, res, next) {
    try {
      let fetchAllSeries = await contentService.getAllSeries();

      res.status(httpStatus.OK).send(fetchAllSeries);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = contentController;
