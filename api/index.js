const express = require("express");
const app = express();
const port = process.env.port || 5000;
const db = require("../src/config/db");
const cors = require("cors");
const route = require("../src/routes");

// Connect to database
db.connect();
app.use(cors());

// ĐỊNH DẠNG DỮ LIỆU
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route
route(app);

app.listen(port, () => {
  console.log(`Local app listening on port ${port}`);
});

module.exports = app;
