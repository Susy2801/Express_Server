const express = require("express");
const route = express.Router();
const postController = require("../app/controller/postController");

route.post("/create", postController.createPost);
route.get("/get", postController.getPost);

module.exports = route;
