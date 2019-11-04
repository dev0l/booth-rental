// Dependencies
const express = require('express');
      path = require('path');
      bodyParser = require('body-parser');
      cors = require('cors');
      passport = require('passport');
      mongoose = require('mongoose');
      config = require('./config/database');

      // Initiate Express
      app = express();

      // Require Routes
      users = require('./routes/users');
      booths = require('./routes/booths');
      boothcards = require('./routes/boothcards');

      // Port Number
      port = 3000;

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('connected to database '+config.database);
});

// On Connection Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

// Promises
mongoose.Promise = global.Promise;

// Middleware

// Cors
app.use(cors());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// /Middleware

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/users', users);
app.use('/booths', booths);
app.use('/boothcards', boothcards);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});