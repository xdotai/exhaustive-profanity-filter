const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const wordProcessor = require('./wordProcessor');

const badWordsDir = path.join(__dirname, '../', '/data/filter/');
const badWordsFiles = fs.readdirSync(badWordsDir);
const badWordsBank = {};

badWordsFiles.forEach((badWordFile) => {
  const badWordFilePath = path.join(badWordsDir, badWordFile);
  const badWordsArray = fs.readFileSync(badWordFilePath)
    .toString()
    .split(',')
    .map((badWord) => {
      const replacedWord = wordProcessor.clean(badWord);
      return _.toLower(replacedWord);
    });
  const badWordsSet = new Set(badWordsArray);
  badWordsSet.delete('');
  if (badWordsSet.size > 0) {
    const badWordsKey = badWordFile.split('.')[0];
    badWordsBank[badWordsKey] = badWordsSet;
  }
});

function ProfanityFilter() {
  return {
    badWordsBank: _.cloneDeep(badWordsBank),
    isIllegal: function isIllegal(text) {
      const textWords = text.split(' ')
        .map((word) => wordProcessor.clean(word))
        .filter((word) => word);
      return _.some(textWords, (word) =>
        _.some(this.badWordsBank, (badWordsSet) => badWordsSet.has(word))
      );
    },
  };
}

module.exports = ProfanityFilter;
