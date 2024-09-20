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
      const { user_name, password, name } = req.body;
      const response = await User.create({
        user_name: user_name,
        password: password,
        name: name,
      });
      res.json({ data: response });
    };

    createUser();
  }

  deleteUser(req, res) {
    const deleteUser = async () => {
      const response = await User.deleteMany({});

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

  loginUser(req, res) {
    const loginUser = async () => {
      const { user_name, password } = req.body;
      const response = await User.find({
        user_name: user_name,
        password: password,
      });
      if (response.length <= 0) {
        res.send({
          message: "No user found",
          isSuccess: false,
        });
      } else {
        res.json({
          message: "OKLA",
          data: response,
          isSuccess: true,
        });
      }
    };

    loginUser();
  }
}

module.exports = new UserController();
