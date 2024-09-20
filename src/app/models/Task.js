const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Task = new Schema({
  title: String,
  content: String,
  deadline: Date,
  label: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Task", Task);
