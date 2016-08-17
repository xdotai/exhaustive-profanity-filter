const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const textProcessor = require('./textProcessor');

const badTextsDir = path.join(__dirname, '../', '/data/filter/');
const badTextsFiles = fs.readdirSync(badTextsDir);
const badTextsBank = {};


const CONSTANTS = {
  // will use this custom set for adding words to the bank
  // without specifying a bucket name
  ANON_SET_NAME: 'EPF_NAMELESS_SET',
};

// building the base word bank
badTextsFiles.forEach((badTextsFile) => {
  const badTextsFilePath = path.join(badTextsDir, badTextsFile);
  const badTextsArray = fs.readFileSync(badTextsFilePath)
    .toString()
    .split(',')
    .map((badText) => {
      const replacedWord = textProcessor.normalize(badText);
      return _.toLower(replacedWord);
    });
  const partition = textProcessor.partitionWordsAndPhrases(badTextsArray, {
    partitionType: textProcessor.PARTITION_TYPES.SET,
  });
  const badTextsKey = badTextsFile.split('.')[0];
  partition.words.delete('');
  badTextsBank[badTextsKey] = {
    words: partition.words,
    phrases: partition.phrases,
  };
});

function ProfanityFilter() {
  return {
    badTextsBank: _.cloneDeep(badTextsBank),

    isIllegal: function isIllegal(text) {
      const normalizedText = textProcessor.normalize(text);
      return textProcessor.hasIllegalWord(normalizedText, this.badTextsBank) ||
      textProcessor.hasIllegalPhrase(normalizedText, this.badTextsBank);
    },

    add: function add(text, partitionName) {
      const actualPartitionName = partitionName || CONSTANTS.ANON_SET_NAME;
      const partition = _.isArray(text) ?
        textProcessor.partition(text, textProcessor.PARTITION_TYPES.SET) :
        textProcessor.partition([text], textProcessor.PARTITION_TYPES.SET);
      if (!this.badTextsBank[actualPartitionName]) {
        this.badTextsBank[actualPartitionName] = partition;
      } else {
        partition.words.forEach((word) => {
          this.badTextsBank[actualPartitionName].words.add(word);
        });
        partition.phrases.forEach((phrase) => {
          this.badTextsBank[actualPartitionName].phrases.add(phrase);
        });
      }
    },
  };
}

module.exports = ProfanityFilter;
