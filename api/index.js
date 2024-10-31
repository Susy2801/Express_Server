const express = require("express");
const app = express();
const port = process.env.port || 5000;
const db = require("../src/config/db");
const cors = require("cors");
const route = require("../src/routes");
const morgan = require("morgan");
const path = require("path");
app.use(morgan("dev")); // Sử dụng để log các request vào terminal

// Socket.io
const http = require("http");

const server = http.createServer(app);

// Connect to database
db.connect();

// Sử dụng thư mục "public" để phục vụ các file tĩnh như HTML, CSS, JS
app.use(express.static(path.join(__dirname, "public")));

const corsConfig = {
  origin: [
    "https://lifetrack-ashen.vercel.app",
    "https://duynguyen.id.vn",
    "http://localhost:3000",
  ], // Cho phép yêu cầu từ domain của frontend của bạn
  methods: ["GET", "POST", "PUT", "DELETE"], // Cho phép các phương thức HTTP
  allowedHeaders: ["Content-Type", "Authorization"], // Cho phép yêu cầu từ domain của frontend của bạn
};
app.use(cors(corsConfig));

// ĐỊNH DẠNG DỮ LIỆU
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route
route(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

server.listen(port, () => {
  console.log(`Local app listening on port ${port}`);
});

module.exports = app;
