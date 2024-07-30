class SiteController {
  index(req, res) {
    res.send("server is running");
  }
}

module.exports = new SiteController();
