const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const profileRoute = require("./profile.route");
const contentRoute = require("./content.route");
const listsRoute = require("./lists.route");

const router = express.Router();

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/profile",
    route: profileRoute,
  },
  {
    path: "/content",
    route: contentRoute,
  },
  {
    path: "/lists",
    route: listsRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
