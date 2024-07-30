const User = require("../models/User");

class UserController {
  getUser(req, res) {
    const getUser = async () => {
      const response = await User.find({});
      res.json({ message: "OK", data: response });
    };

    getUser();
  }

  createUser(req, res) {
    const createUser = async () => {
      const response = await User.create({
        user_name: "SUSY",
      });
      res.json({ data: response });
    };

    createUser();
  }

  deleteUser(req, res) {
    const deleteUser = async () => {
      const response = await User.deleteMany({
        user_name: "Duy",
      });

      res.json({ message: "Xóa con mẹ nó hết rồi", data: response });
    };

    deleteUser();
  }

  updateUser(req, res) {
    const updateUser = async () => {
      const response = await User.updateMany({
        user_name: "Duy",
      });
      res.json({ response });
    };
    updateUser();
  }
}

module.exports = new UserController();
