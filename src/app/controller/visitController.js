const Visit = require("../models/Visit");

// Hàm định dạng thời gian
const formatTime = (isoString) => {
  if (!isoString) return "No data";
  const date = new Date(isoString);

  // Định dạng thời gian theo múi giờ Việt Nam
  const options = {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  // Chuyển sang dạng chuỗi theo định dạng mong muốn
  const formattedDate = date.toLocaleString("en-GB", options);

  return formattedDate.replace(",", " -"); // Thay dấu phẩy để có định dạng giờ phù hợp
};

// Hàm xác định loại thiết bị, hệ điều hành và trình duyệt
const parseUserAgent = (userAgent) => ({
  device: /Mobile|Android|iPhone|iPad/.test(userAgent) ? "Mobile" : "Desktop",
  os: /Windows|Mac OS|Linux|Android|iOS/.exec(userAgent)?.[0] || "Unknown",
  browser: /Chrome|Firefox|Safari|Opera|Edge/.exec(userAgent)?.[0] || "Unknown",
});

class VisitController {
  async updateVisitor(req, res) {
    try {
      const { userId } = req.body;
      if (!userId) {
        console.log("Không tìm thấy userID");
        return res.status(400).json({ message: "UserID is missing." });
      }

      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const userAgent = req.headers["user-agent"];
      const referrer = req.headers["referer"] || "Direct";
      const language = req.headers["accept-language"];
      const { device, os, browser } = parseUserAgent(userAgent);
      const lastVisit = new Date();

      let visit = await Visit.findOne({ userId });
      if (visit) {
        // Cập nhật nếu đã có bản ghi với userId
        visit.visitCount += 1;
        visit.lastVisit = lastVisit;
        await visit.save();
      } else {
        // Tạo bản ghi mới nếu chưa có userId
        visit = new Visit({
          ip,
          userId,
          userAgent,
          referrer,
          language,
          device,
          os,
          browser,
          visitCount: 1,
          firstVisit: lastVisit,
        });
        await visit.save();
      }

      res.status(200).json({ message: "Visit recorded successfully!" });
    } catch (error) {
      console.error("Error tracking visit:", error);
      res.status(500).json({ message: "Error tracking visit" });
    }
  }

  async statReport(req, res) {
    try {
      const visitors = await Visit.find({});
      const totalVisitCount = visitors.reduce(
        (acc, user) => acc + user.visitCount,
        0
      );

      const visitorInfo = visitors.map((user) => ({
        userId: user.userId,
        ip: user.ip,
        visitCount: user.visitCount,
        firstVisit: formatTime(user.firstVisit),
        lastVisit: formatTime(user.lastVisit),
      }));

      res.status(200).json({ totalVisit: totalVisitCount, users: visitorInfo });
    } catch (error) {
      console.error("Error generating report:", error);
      res.status(500).json({ message: "Error generating report" });
    }
  }
}

module.exports = new VisitController();
