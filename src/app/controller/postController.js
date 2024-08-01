const Post = require("../models/Post");

class PostController {
  async createPost(req, res) {
    const { title, content, author } = req.body;
    try {
      const post = new Post({
        title: title,
        content: content,
        author: author,
      });
      await post.save();

      res.send(post);
    } catch (error) {
      console.log(error);
    }
  }

  async getPost(req, res) {
    const { title } = req.query;
    try {
      const post = await Post.find({ title: title }).populate("author").exec();
      res.send(post);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new PostController();
