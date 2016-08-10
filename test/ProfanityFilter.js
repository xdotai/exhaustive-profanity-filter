const ProfanityFilter = require('../utils/ProfanityFilter');
const assert = require('assert');

describe('ProfanityFilter', () => {
  const filter = new ProfanityFilter();
  it('should filter bad words', () => {
    assert(filter.isIllegal('shit'), '<Shit> should be illegal.');
  });
});
