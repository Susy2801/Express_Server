// models/File.js
const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  ip: String,
  userId: String,
  userAgent: String,
  referrer: String,
  language: String,
  device: String,
  os: String,
  browser: String,
  visitCount: { type: Number, default: 1 },
  firstVisit: Date,
  lastVisit: Date,
});

module.exports = mongoose.model("Visit", visitSchema);
