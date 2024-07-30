const express = require("express");
const route = express.Router();
const getUserController = require("../app/controller/userController");

route.get("/update", getUserController.updateUser);
route.get("/delete", getUserController.deleteUser);
route.get("/create", getUserController.createUser);
route.get("/get", getUserController.getUser);

module.exports = route;
