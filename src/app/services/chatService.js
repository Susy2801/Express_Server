let chatHistory = [];

// Lưu tin nhắn vào bộ nhớ (hoặc database)
function saveMessage(message) {
  chatHistory.push(message);
}

// Lấy lịch sử tin nhắn
function getHistory() {
  return chatHistory;
}

module.exports = { saveMessage, getHistory };
