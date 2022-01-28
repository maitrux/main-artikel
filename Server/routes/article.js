const articleFinder = require("../public/javascripts/article-finder.js");

var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  var foundArticle = articleFinder.findWord(req.query.word)
  res.send(foundArticle)
})

module.exports = router;