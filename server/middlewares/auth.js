const jwt = require("jsonwebtoken");
require("dotenv").config();
const httpStatus = require("http-status");
const userService = require("../services/user.service");
const { ApiError } = require("./apiError");

const auth = () => async (req, res, next) => {
  try {
    let accessToken = req.headers["authorization"];
    if (!accessToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized user!");
    }

    let validToken = await userService.validateToken(accessToken);

    if (validToken && accessToken) {
      req.authenticated = validToken;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const adminAuth = () => async (req, res, next) => {
  try {
    let accessToken = req.headers["authorization"];
    if (!accessToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized user!");
    }

    let validToken = await userService.validateToken(accessToken);

    if (validToken && accessToken) {
      if (validToken.isAdmin == true) {
        req.authenticated = validToken;
        next();
      } else {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Admin access needed!");
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { auth, adminAuth };
