const express = require("express");
const route = express.Router();
const VisitController = require("../app/controller/visitController");

route.post("/tracking", VisitController.updateVisitor);
route.get("/stat", VisitController.statReport);

module.exports = route;
