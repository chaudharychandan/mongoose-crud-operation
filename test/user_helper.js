const mongoose = require('mongoose');

//mongodb connection using mongoose ORM
mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
  .once('open', () => console.log('Connected to users_test DB'))
  .on('error', (error) => console.warn('Warn', error))
  ;

//Runs before every test case
beforeEach((done) => {
  //Drops users collection before every it block
  //Invokes done callback function once drop operation completes
  mongoose.connection.collections.users.drop(() => {
    done();
  })
});
