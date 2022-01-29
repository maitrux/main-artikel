const articleFinder = require("../public/javascripts/article-finder.js");

var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  var randomWord = articleFinder.randomWord()
  res.send(randomWord)
})

module.exports = router;