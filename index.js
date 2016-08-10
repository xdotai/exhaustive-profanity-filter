'use strict'

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const badWordsDir = __dirname + '/data/filter/';
const badWordsFiles = fs.readdirSync(badWordsDir);
const badWordsWrapper = {
  words: {}
};

badWordsFiles.forEach((badWordFile) => {
  const badWordFilePath = path.join(badWordsDir, badWordFile);
  const badWordsArray = fs.readFileSync(badWordFilePath)
    .toString()
    .split(",")
    .map((badWord) => {
      const replacedWord = badWord.replace(/[-_=\+\/\\\.<>\?\*;\(\)\{\}:\n]/g, '').trim();
      return _.toLower(replacedWord);
    });
  const badWordsSet = new Set(badWordsArray);
  badWordsSet.delete('');
  if (badWordsSet.size > 0) {
    const badWordsKey = badWordFile.split(".")[0];
    badWordsWrapper.words[badWordsKey] = badWordsSet;
  }
});

badWordsWrapper.isIllegal = function(text) {
  let isBadWord = false;
  _.forEach(badWordsWrapper.words, (badWordsSet, badWordsKey) => {
    const wordsInText = text.split(/[ ]+/).map((word) => _.toLower(word));
    _.forEach(wordsInText, (word) => {
      if (badWordsSet.has(word)) {
        isBadWord = true;
        return;
      }
    });
    if (isBadWord) return;
  });
  return isBadWord;
};

module.exports = badWordsWrapper;
