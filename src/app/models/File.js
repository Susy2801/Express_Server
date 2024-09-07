// models/File.js
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  content: Buffer, // Lưu nội dung file dưới dạng Buffer
});

module.exports = mongoose.model("File", fileSchema);
