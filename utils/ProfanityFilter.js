const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const wordProcessor = require('./wordProcessor');

const badWordsDir = path.join(__dirname, '../', '/data/filter/');
const badWordsFiles = fs.readdirSync(badWordsDir);
const badWordsBank = {};

// will use this custom set for adding words to the bank
// without specifying a bucket name
const ANON_SET_NAME = 'EPF_NAMELESS_SET';

badWordsFiles.forEach((badWordsFile) => {
  const badWordsFilePath = path.join(badWordsDir, badWordsFile);
  const badWordsArray = fs.readFileSync(badWordsFilePath)
    .toString()
    .split(',')
    .map((badWord) => {
      const replacedWord = wordProcessor.normalize(badWord);
      return _.toLower(replacedWord);
    });
  const partition = wordProcessor.partitionWordsAndPhrases(badWordsArray, {
    partitionType: wordProcessor.PARTITION_TYPES.SET,
  });
  const badWordsKey = badWordsFile.split('.')[0];
  partition.words.delete('');
  badWordsBank[badWordsKey] = {
    words: partition.words,
    phrases: partition.phrases,
  };
});

function ProfanityFilter() {
  return {
    badWordsBank: _.cloneDeep(badWordsBank),

    isIllegal: function isIllegal(text) {
      const normalizedText = wordProcessor.normalize(text);
      return wordProcessor.hasIllegalWord(normalizedText, this.badWordsBank) ||
      wordProcessor.hasIllegalPhrase(normalizedText, this.badWordsBank);
    },

    add: function add(phrase, setName) {
      const actualSetName = setName || ANON_SET_NAME;
      if (setName) {
        if (!this.extendedBadWordsBank[actualSetName]) {
          this.extendedBadWordsBank[actualSetName] = new Set();
        }
        this.extendedBadWordsBank[actualSetName].add(phrase);
      }
    },
  };
}

module.exports = ProfanityFilter;
