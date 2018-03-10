const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
  it('post count return number of posts', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post Title' }]
    });

    joe.save()
      .then(() => User.findOne({ name: joe.name }))
      .then((user) => {
        assert(user.postCount === joe.posts.length);
        done();
      });
  });
});
