const assert = require('assert');
const User = require('../src/user');

describe('Updating users', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => {
        done();
      });
  });

  const assertName = (operation, name, done) => {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === name);
        done();
      });
  }

  it('model instance set and save', (done) => {
    const name = 'Alex';
    joe.set('name', name);
    assertName(
      joe.save(),
      name,
      done
    );
  });

  it('model instance update', (done) => {
    const name = 'Alex';
    assertName(
      joe.update({ name }),
      name,
      done
    );
  });

  it('class method update', (done) => {
    const name = 'Alex';
    assertName(
      User.update(
        { name: joe.name },{ name }),
        name,
        done
      );
  });

  it('class method findOneAndUpdate', (done) => {
    const name = 'Alex';
    assertName(
      User.findOneAndUpdate({ name: joe.name },{ name }),
      name,
      done
    );
  });

  it('class method update', (done) => {
    const name = 'Alex';
    assertName(
      User.findByIdAndUpdate(joe._id, { name }),
      name,
      done
    );
  });
});
