const { ApiError } = require("../middlewares/apiError");
const { listsService } = require("../services/");
const httpStatus = require("http-status");
const {
  addListSchema,
  deleteListSchema,
  getListSchema,
  editListSchema,
  addListItemSchema,
  removeListItemSchema,
  getListByIdSchema,
} = require("../validations/listsValidations");
const { addListItem } = require("../services/lists.service");
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
      let values = await editListSchema.validateAsync(req.body);

      let updatedList = await listsService.addListItem(
        values.id,
        values.title,
        values.genre,
        values.content
      );

      res.status(httpStatus.OK).send(updatedList);
    } catch (error) {
      next(error);
    }
  },

  async addListItem(req, res, next) {
    try {
      let values = await addListItemSchema.validateAsync(req.body);

      let updatedList = await listsService.addListItem(
        values.id,
        values.content
      );
      if (updatedList.modifiedCount > 0) {
        res.status(httpStatus.OK).send({ message: "List Item added!" });
      }
    } catch (error) {
      next(error);
    }
  },

  async removeListItem(req, res, next) {
    try {
      let values = await removeListItemSchema.validateAsync(req.body);

      let updatedList = await listsService.removeListItem(
        values.id,
        values.contentId
      );
      if (updatedList.modifiedCount > 0) {
        res.status(httpStatus.OK).send({ message: "List Item removed!" });
      }
    } catch (error) {
      next(error);
    }
  },

  async deleteList(req, res, next) {
    try {
      let values = await deleteListSchema.validateAsync(req.body);

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
      let values = await getListSchema.validateAsync({
        contentType: req.query.contentType,
        genreType: req.query.genreType,
      });
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

  async getListById(req, res, next) {
    try {
      let values = await getListByIdSchema.validateAsync({
        id: req.params.id
      });

      let list = await listsService.fetchListById(values.id);

      res.status(httpStatus.OK).send(list);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = listController;
