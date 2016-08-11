const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const wordProcessor = require('./wordProcessor');

const badWordsDir = path.join(__dirname, '../', '/data/filter/');
const badWordsFiles = fs.readdirSync(badWordsDir);
const badWordsBank = {};

// will use this custom set for adding words to the bank
// without specifying a name
const ANON_SET_NAME = 'EPF_NAMELESS_SET';

badWordsFiles.forEach((badWordsFile) => {
  const badWordsFilePath = path.join(badWordsDir, badWordsFile);
  const badWordsArray = fs.readFileSync(badWordsFilePath)
    .toString()
    .split(',')
    .map((badWord) => {
      const replacedWord = wordProcessor.clean(badWord);
      return _.toLower(replacedWord);
    });
  // const wordsAndPhrasesPartitions = partitionWords(badWordsArray);
  // singleWordsSet.delete('');
  // phrasesSet.delete('');
  // const badWordsKey = badWordsFile.split('.')[0];
  // badWordsBank[badWordsKey] = {
  //   singleWords: singleWordsSet,
  //   phrases: phrasesSet
  // };
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
