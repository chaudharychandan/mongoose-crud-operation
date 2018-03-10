const mongoose = require('mongoose');

before((done) => {
  //mongodb connection using mongoose ORM
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => console.warn('Warn', error))
    ;
});

//Runs before every test case
beforeEach((done) => {
  //Drops users collection before every it block
  //Invokes done callback function once drop operation completes
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});

after((done) => {
  //Close database connection
  mongoose.connection.close(() => {
    done();
  });
});
