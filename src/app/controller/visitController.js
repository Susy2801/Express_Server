const Visit = require("../models/Visit");

class VisitController {
  async updateVisitor(req, res) {
    try {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const userAgent = req.headers["user-agent"];
      const referrer = req.headers["referer"] || "Direct";
      const language = req.headers["accept-language"];
      const screenResolution = req.body.screenResolution;
      const timestamp = new Date();

      // Lấy sessionDuration và kiểm tra xem có phải số hợp lệ không
      const sessionDuration = !isNaN(req.body.sessionDuration)
        ? req.body.sessionDuration
        : 0;

      // Xử lý thông tin thiết bị, hệ điều hành, trình duyệt từ user-agent
      const device = /Mobile|Android|iPhone|iPad/.test(userAgent)
        ? "Mobile"
        : "Desktop";
      const os =
        /Windows|Mac OS|Linux|Android|iOS/.exec(userAgent)?.[0] || "Unknown";
      const browser =
        /Chrome|Firefox|Safari|Opera|Edge/.exec(userAgent)?.[0] || "Unknown";

      // Tìm bản ghi có cùng IP và Referer
      let visit = await Visit.findOne({ ip, referrer });

      if (visit) {
        // Nếu đã tồn tại cùng IP và Referer, cập nhật thông tin
        visit.userAgent = userAgent;
        visit.visitCount += 1;
        visit.sessionDuration += sessionDuration;
        visit.timestamp = timestamp;
        await visit.save();
      } else {
        // Nếu cùng IP nhưng khác Referer, tạo bản ghi mới
        visit = new Visit({
          ip,
          userAgent,
          referrer,
          language,
          device,
          os,
          browser,
          screenResolution,
          visitCount: 1,
          timestamp,
          sessionDuration,
        });
        await visit.save();
      }

      res.status(200).json({ message: "Visit recorded successfully!" });
    } catch (error) {
      console.error("Error tracking visit:", error);
      res.status(500).json({ message: "Error tracking visit" });
    }
  }
}

module.exports = new VisitController();
