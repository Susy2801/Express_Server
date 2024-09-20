const siteRouter = require("./site");
const getUserRouter = require("./user");
const postRouter = require("./post");
const fileRouter = require("./file");
const taskRouter = require("./task");

function route(app) {
  app.use("/tasks", taskRouter);
  app.use("/file", fileRouter);
  app.use("/post", postRouter);
  app.use("/user", getUserRouter);
  app.use("/", siteRouter);
}

module.exports = route;
