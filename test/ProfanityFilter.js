const ProfanityFilter = require('../utils/ProfanityFilter');
const assert = require('assert');

describe('ProfanityFilter', () => {
  const filter = new ProfanityFilter();
  it('should filter bad words', () => {
    assert(filter.isIllegal('shit'), '<Shit> should be illegal.');
  });

  describe('add function', () => {
    const filterToAdd = new ProfanityFilter();
    it('should add new phrases to the filter', () => {
      filterToAdd.add('This word');
      assert(filter.isIllegal('This word is illegal'));
    });
  });
});
