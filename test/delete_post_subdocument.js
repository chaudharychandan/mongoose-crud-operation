const assert = require('assert');
const User = require('../src/user');

describe('Removing post', () => {
  it('remove post subdocument from user document', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{
        title: 'Post Title'
      }]
    });

    joe.save()
      .then(() => User.findOne({ name: joe.name }))
      .then((user) => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: joe.name }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
