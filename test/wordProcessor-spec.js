const wordProcessor = require('../utils/wordProcessor');
const assert = require('assert');
const _ = require('lodash');

describe('WordProcessor', () => {
  describe('hasIllegalPhrase function', () => {
    it('should return true if a given text has an illegal phrase', () => {
      assert(wordProcessor.hasIllegalPhrase('this is a sentence', {
        test: {
          words: new Set(['these', 'are', 'words']),
          phrases: ['a sentence', 'another sentence'],
        },
      }), 'failed to detect the illegal phrase');
    });
  });

  describe('hasIllegalWord function', () => {
    it('should return true if a given text has an illegal word', () => {
      assert(wordProcessor.hasIllegalWord('this is a sentence', {
        test: {
          words: new Set(['these', 'sentence', 'words']),
          phrases: ['a phrase', 'another phrase'],
        },
      }), 'failed to detect the illegal word');
    });
  });

  describe('partitionWordsAndPhrases function', () => {
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

    it('should partition words into a set and phrases into an array when type is set', () => {
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
        phrases: [
          'unless they are whitespace separated',
        ],
      };
      assert(_.isEqual(actualPartition, expectedPartition), 'could not partition correctly');
    });
  });
});
