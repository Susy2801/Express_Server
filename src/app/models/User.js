const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  user_name: String,
  password: { type: String, default: "undefined" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", User);
