const mongoose = require('mongoose');
bcrypt = require('bcryptjs');
config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, unique: true, lowercase: true, required: true },
  phone: { type: String, unique: true, sparse: true },
  username: { type: String, unique: true, lowercase: true, required: true, index: true },
  // username: { type: String, unique: true, lowercase: true, required: true, index: true, default: "admin" },
  password: { type: String, unique: true, required: true, default: "Lisses123" },
  // password: { type: String, unique: true, required: true },
  bc: { type: mongoose.Schema.Types.ObjectId, ref: 'BoothCard' },
  comments: { type: String },
  created: { type: Date, default: Date.now }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Save (Add User)
module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

// Compare (bcrypt Password)
module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

// Find By Id
module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

// Find One (By Username)
module.exports.getUserByUsername = (username, callback) => {
  const query = { username: username };
  User.findOne(query, callback);
};

// Find (All Users)
module.exports.getUsers = (results, callback) => {
  User.find({}, results, callback);
};

// Update - Find By Id And Update
module.exports.updateUser = (id, update, options, callback) => {
  User.findByIdAndUpdate(id, update, options, callback);
};

// Remove - Find By Id And Remove
module.exports.removeUser = (id, callback) => {
  // User.findByIdAndRemove(id, options, callback);
  User.findByIdAndRemove(id, callback);
};