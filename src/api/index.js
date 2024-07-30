const express = require("express");
const app = express();
const port = 3000;
const db = require("../config/db");
const cors = require("cors");
const route = require("../routes");

// Connect to database
db.connect();

// CORS
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
