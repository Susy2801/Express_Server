// models/File.js
const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  referrer: String,
  language: String,
  device: String,
  os: String,
  browser: String,
  screenResolution: String,
  visitCount: { type: Number, default: 1 },
  timestamp: Date,
  sessionDuration: { type: Number, default: 0 },
});

module.exports = mongoose.model("Visit", visitSchema);
