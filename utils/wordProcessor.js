const _ = require('lodash');

const PARTITION_TYPES = {
  ARRAY: 'ARRAY',
  SET: 'SET',
};

function clean(word) {
  return word.trim().replace(/^[^a-zA-Z ]*$/g, ' ').trim();
}

function isWord(text) {
  return text.split(' ').length === 1;
}

function partitionWordsAndPhrases(text, options) {
  const partition = _.partition(text, isWord);
  const partitionType = (options && options.partitionType) ?
    options.partitionType :
    PARTITION_TYPES.ARRAY;
  const isArray = (partitionType === PARTITION_TYPES.ARRAY);
  const words = isArray ?
    partition[0] :
    new Set(partition[0]);
  const phrases = isArray ?
    partition[1] :
    new Set(partition[1]);
  return {
    words,
    phrases,
  };
}

module.exports = {
  clean,
  isWord,
  partitionWordsAndPhrases,
  PARTITION_TYPES,
};
