const File = require("../models/File");
const multer = require("multer");
const csv = require("csv-parser"); // Thư viện để phân tích tệp CSV
const { Readable } = require("stream");

class FileController {
  async uploadFile(req, res) {
    try {
      // Kiểm tra xem file có tồn tại không
      if (!req.file || req.file.mimetype !== "text/csv") {
        console.log("No CSV file uploaded or wrong file type.");
        return res.status(400).send("Please upload a valid CSV file.");
      }

      // In thông tin tệp đã tải lên để kiểm tra
      console.log("CSV file uploaded:", req.file.originalname);

      // Chỉ lưu tệp CSV và nội dung vào MongoDB
      const newFile = new File({
        name: req.file.originalname, // Tên file CSV
        content: req.file.buffer, // Nội dung file CSV dưới dạng buffer
      });

      await newFile.save();
      console.log("CSV file saved to MongoDB.");

      res
        .status(200)
        .send("CSV file uploaded and saved to MongoDB successfully!");
    } catch (err) {
      console.log("Error:", err.message);
      res.status(500).send("Error uploading CSV file: " + err.message);
    }
  }

  async downloadFile(req, res) {
    try {
      const filename = req.params.filename; // Lấy tên tệp từ URL

      // Tìm tệp trong MongoDB dựa trên tên tệp
      const file = await File.findOne({ name: filename });

      if (!file) {
        return res.status(404).send("File not found in MongoDB.");
      }

      // Đặt tiêu đề HTTP để tải xuống tệp CSV
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

      // Gửi dữ liệu CSV từ buffer cho client
      res.send(file.content);
    } catch (error) {
      console.error("Error downloading file:", error);
      res.status(500).send("Error downloading file.");
    }
  }
}

module.exports = new FileController();
