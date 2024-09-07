const express = require("express");
const route = express.Router();
const fileController = require("../app/controller/fileController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post("/upload", upload.single("file"), fileController.uploadFile);
route.get("/download/:filename", fileController.downloadFile);

module.exports = route;
