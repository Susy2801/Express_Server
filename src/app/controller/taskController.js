const Task = require("../models/Task");
const mongoose = require("mongoose");

class TaskController {
  async create(req, res) {
    const { title, content, deadline, label, author } = req.body;
    try {
      const taskCreated = await Task.create({
        title: title,
        content: content,
        deadline: deadline,
        label: label,
        author: author,
      });

      res.send({
        message: "Create Success",
      });
      console.log(taskCreated);
    } catch (error) {
      console.log(`Lỗi: ${error}`);
    }
  }

  async get(req, res) {
    const { author } = req.query;
    try {
      const data = await Task.find({ author: author }).populate("author");
      res.json({
        message: "Success",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}

module.exports = new TaskController();
