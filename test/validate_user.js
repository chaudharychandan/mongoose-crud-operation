const assert = require('assert');
const User = require('../src/user');
const constants = require('../src/constants');

describe('Validating users', (done) => {
  it('requires a user name', (done) => {
    const user = new User({ name: undefined });
    const { errors: { name: { message } } } = user.validateSync();
    assert(message === constants.nameRequiredMessage);
    done();
  });

  it('requires a user\'s name greater than 2 characters', (done) => {
    const user = new User({ name: 'Al' });
    const { errors: { name: { message } } } = user.validateSync();
    assert(message === constants.nameMinLengthMesssage);
    done();
  });

  it('disallows invalid users from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save()
      .catch((validation) => {
        const { errors: { name: { message } } } = validation;
        assert(message === constants.nameMinLengthMesssage);
        done();
      })
  });
});
