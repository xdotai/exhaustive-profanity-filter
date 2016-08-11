const ProfanityFilter = require('../utils/ProfanityFilter');
const assert = require('assert');
const _ = require('lodash');

describe('ProfanityFilter', () => {
  describe('when built', () => {
    const filterBuilt = new ProfanityFilter();
    it('should build the badwords bank correctly', () => {
      const expected = {
        words: new Set([
          'exhaustive-profanity-filter-test-word-1',
          'exhaustive-profanity-filter-test-word-2',
          'exhaustive-profanity-filter-test-word-3',
          'exhaustive-profanity-filter-test-word-4',
          'exhaustive-profanity-filter-test-word-5',
          'exhaustive-profanity-filter-test-word-6',
          'exhaustive-profanity-filter-test-word-7',
          'exhaustive-profanity-filter-test-word-8',
          'exhaustive-profanity-filter-test-word-9',
        ]),
        phrases: [
          'exhaustive profanity filter test phrase 1',
          'exhaustive profanity filter test phrase 2',
          'exhaustive profanity filter test phrase 3',
        ],
      };
      assert(
        _.isEqual(filterBuilt.badWordsBank.test, expected),
        'could not build the badwords bank correctly'
      );
    });
  });

  describe('isIllegal function', () => {
    const filter = new ProfanityFilter();
    it('should filter bad words', () => {
      assert(filter.isIllegal('shit'), '<shit> should be illegal.');
    });

    it('should filter bad words regardless of lettercases', () => {
      assert(filter.isIllegal('Shit'), '<shit> should be illegal.');
    });
  });

  // describe('add function', () => {
  //   const filterToAdd = new ProfanityFilter();
  //   it('should add new phrases to the filter', () => {
  //     filterToAdd.add('This word');
  //     assert(filter.isIllegal('This word is illegal'));
  //   });
  // });
});
