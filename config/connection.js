const { connect, connection } = require('mongoose');

// Connect to new db: socialNetwork
connect('mongodb://localhost/socialNetwork', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true, // Necessary to check for unique data entries
})
.then(() => {
  console.log("Connected to socialNetworkDB");
});

module.exports = connection;