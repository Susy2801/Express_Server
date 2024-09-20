const express = require("express");
const route = express.Router();
const TaskController = require("../app/controller/taskController");

route.post("/create", TaskController.create);
route.get("/get", TaskController.get);

module.exports = route;
