const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://nduy28:duy983868@susy.omborin.mongodb.net/nduy28?retryWrites=true&w=majority&appName=Susy"
    );
    console.log("Kết nối cơ sở dữ liệu thành công");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
