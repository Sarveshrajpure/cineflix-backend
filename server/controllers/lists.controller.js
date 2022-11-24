const { ApiError } = require("../middlewares/apiError");
const { listsService } = require("../services/");
const httpStatus = require("http-status");
const {
  addListSchema,
  deleteListSchema,
  getListSchema,
} = require("../validations/listsValidations");
require("dotenv").config();

const listController = {
  async addNewList(req, res, next) {
    try {
      let values = await addListSchema.validateAsync(req.body);

      if (values) {
        let addedList = await listsService.createList(
          values.title,
          values.type,
          values.genre,
          values.content
        );

        res.status(httpStatus.CREATED).send(addedList);
      }
    } catch (error) {
      next(error);
    }
  },

  async updateList(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  },

  async deleteList(req, res, next) {
    try {
      let values = await deleteListSchema.validateAsync(req.body);
      console.log(values);

      if (values) {
        let deleteList = await listsService.deleteList(values.id);

        if (deleteList.deletedCount > 0) {
          res.status(httpStatus.OK).send({ message: "List has been deleted!" });
        } else {
          res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: "List with id may not exist" });
        }
      }
    } catch (error) {
      next(error);
    }
  },

  async getAllList(req, res, next) {
    try {
      let values = await getListSchema.validateAsync(req.body);
      let list = [];
      if (values) {
        if (
          values.contentType === "movies" ||
          values.contentType === "series"
        ) {
          if (values.genreType) {
            list = await listsService.getLists(
              values.contentType,
              values.genreType
            );

            res.status(httpStatus.OK).send(list);
          } else {
            list = await listsService.getLists(values.contentType);

            res.status(httpStatus.OK).send(list);
          }
        } else {
          list = await listsService.getLists();

          res.status(httpStatus.OK).send(list);
        }
      }
    } catch (error) {
      next(error);
    }
  },
};
module.exports = listController;
