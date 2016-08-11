const _ = require('lodash');

const PARTITION_TYPES = {
  ARRAY: 'ARRAY',
  SET: 'SET',
};

function normalize(text) {
  return _.toLower(text.replace(/^[^a-zA-Z ]*$/g, ' ').trim());
}

function isWord(text) {
  return text.split(' ').length === 1;
}

function hasIllegalPhrase(text, badWordsBank) {
  return _.some(badWordsBank,
    (badWordsPartition) => _.some(badWordsPartition.phrases,
      (badPhrase) => _.includes(text, badPhrase)
    )
  );
}

function hasIllegalWord(text, badWordsBank) {
  const words = text.split(' ');
  return _.some(words,
    (word) => _.some(badWordsBank,
      (badWordsPartition) => badWordsPartition.words.has(word)
    )
  );
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
  const phrases = partition[1];
  return {
    words,
    phrases,
  };
}

module.exports = {
  normalize,
  isWord,
  partitionWordsAndPhrases,
  hasIllegalPhrase,
  hasIllegalWord,
  PARTITION_TYPES,
};
