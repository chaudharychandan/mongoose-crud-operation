const assert = require('assert');
const User = require('../src/user');

describe('Updating users', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
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

  it('likes increment using $inc operator', (done) => {
    const count = 10;
    User.update({ name: joe.name }, { $inc: { likes: count } })
    .then(() => User.findOne({ name: joe.name }))
    .then((user) => {
      assert(user.likes === joe.likes + count);
      done();
    });
  });
});
