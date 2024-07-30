const siteRouter = require("./site");
const getUserRouter = require("./user");

function route(app) {
  app.use("/user", getUserRouter);
  app.use("/", siteRouter);
}

module.exports = route;
