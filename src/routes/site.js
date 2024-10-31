const express = require("express");
const route = express.Router();
const siteController = require("../app/controller/siteController");
const path = require("path");
// route.get("/", siteController.index);
route.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public", "index.html"));
});

module.exports = route;
