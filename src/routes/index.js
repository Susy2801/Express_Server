const siteRouter = require("./site");
const getUserRouter = require("./user");
const postRouter = require("./post");

function route(app) {
  app.use("/post", postRouter);
  app.use("/user", getUserRouter);
  app.use("/", siteRouter);
}

module.exports = route;
