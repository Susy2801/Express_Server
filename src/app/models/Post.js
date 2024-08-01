const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Post", Post);
