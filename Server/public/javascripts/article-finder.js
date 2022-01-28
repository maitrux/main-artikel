var test = require('../data/german_nouns.json');

const words = test.words;

function findWord(inputWord) {
  var foundWordObject = {}

  words.map(wordObject => {
    if(inputWord.toLowerCase() == wordObject.wordSingular.toLowerCase()) {
      foundWordObject.articleSingular = wordObject.articleSingular;
      foundWordObject.wordSingular = wordObject.wordSingular;
      foundWordObject.articlePlural = wordObject.articlePlural;
      foundWordObject.wordPlural = wordObject.wordPlural;
      foundWordObject.englishTranslation = wordObject.englishTranslation;
    }
  })

  return foundWordObject;
}

module.exports = { findWord }

// findWord();