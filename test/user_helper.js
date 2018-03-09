const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');

mongoose.connection
  .once('open', () => console.log('Connected to users_test DB'))
  .on('error', (error) => console.warn('Warn', error))
  ;
