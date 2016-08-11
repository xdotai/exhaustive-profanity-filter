const ProfanityFilter = require('../utils/ProfanityFilter');
const assert = require('assert');
const _ = require('lodash');

describe('ProfanityFilter', () => {
  describe('when built', () => {
    const filterBuilt = new ProfanityFilter();
    it('should build the badwords bank correctly', () => {
      const expected = {
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
      assert(
        _.isEqual(filterBuilt.badWordsBank.test, expected),
        'could not build the badwords bank correctly'
      );
    });
  });

  describe('isIllegal function', () => {
    const filter = new ProfanityFilter();
    it('should filter bad words', () => {
      assert(filter.isIllegal('shit'), '<Shit> should be illegal.');
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
