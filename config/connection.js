const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialNetwork', { // Connect to new db: socialNetwork
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;