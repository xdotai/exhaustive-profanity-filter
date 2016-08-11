const wordProcessor = require('../utils/wordProcessor');
const assert = require('assert');
const _ = require('lodash');

describe('WordProcessor', () => {
  const texts = [
    'words',
    'are',
    'not',
    'phrases',
    'unless they are whitespace separated',
  ];

  it('should partition words and phrases into arrays when type is not given', () => {
    const actualPartition = wordProcessor.partitionWordsAndPhrases(texts);
    const expectedPartition = {
      words: [
        'words',
        'are',
        'not',
        'phrases',
      ],
      phrases: [
        'unless they are whitespace separated',
      ],
    };
    assert(_.isEqual(actualPartition, expectedPartition), 'could not partition correctly');
  });

  it('should partition words and phrases into arrays when type is array', () => {
    const options = {
      partitionType: wordProcessor.PARTITION_TYPES.ARRAY,
    };
    const actualPartition = wordProcessor.partitionWordsAndPhrases(texts, options);
    const expectedPartition = {
      words: [
        'words',
        'are',
        'not',
        'phrases',
      ],
      phrases: [
        'unless they are whitespace separated',
      ],
    };
    assert(_.isEqual(actualPartition, expectedPartition), 'could not partition correctly');
  });

  it('should partition words and phrases into sets when type is set', () => {
    const options = {
      partitionType: wordProcessor.PARTITION_TYPES.SET,
    };
    const actualPartition = wordProcessor.partitionWordsAndPhrases(texts, options);
    const expectedPartition = {
      words: new Set([
        'words',
        'are',
        'not',
        'phrases',
      ]),
      phrases: new Set([
        'unless they are whitespace separated',
      ]),
    };
    assert(_.isEqual(actualPartition, expectedPartition), 'could not partition correctly');
  });
});
