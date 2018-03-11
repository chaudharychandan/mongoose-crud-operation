const assert = require('assert');
const User = require('../src/user');

describe('Reading Users', () => {
  let joe, maria, alex, zach;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    alex = new User({ name: 'Alex' });
    zach = new User({ name: 'Zach' });

    Promise.all([
      joe.save(),
      maria.save(),
      alex.save(),
      zach.save()
    ])
      .then(() => done());
  });

  it('finds all users with a new of joe', (done) => {
    User.find({ name: joe.name })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('finds a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === joe.name);
        done();
      })
  });

  it.only('can skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === joe.name);
        assert(users[1].name === maria.name);
        done();
      })
  });
});
