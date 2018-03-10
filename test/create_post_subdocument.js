const assert = require('assert');
const User = require('../src/user');

describe('Creating post', () => {
  it('create a user with post as subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{
        title: 'Post Title'
      }]
    });

    joe.save()
      .then(() => User.findOne({ name: joe.name }))
      .then((user) => {
        assert(user.posts[0].title === joe.posts[0].title);
        done();
      });
  });

  it('add post as subdocument to existing user record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });
    const title = 'Post Title';

    joe.save()
      .then(() => User.findOne({ name: joe.name }))
      .then((user) => {
        user.posts.push({ title });
        return user.save();
      })
      .then(() => User.findOne({ name: joe.name }))
      .then((user) => {
        assert(user.posts[0].title === title);
        done();
      });
  });
});
