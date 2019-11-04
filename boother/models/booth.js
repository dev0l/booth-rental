const mongoose = require('mongoose');
config = require('../config/database');

// Booth Schema
const BoothSchema = mongoose.Schema({
  bNr: { type: Number, unique: true, index: true },
  rented: { type: Boolean, default: false },
  rentedFrom: [ Date ],
  rentedTo: [ Date ],
  paid: { type: Boolean, default: false },
  renter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: String,
  created: { type: Date, default: Date.now }
});

const Booth = module.exports = mongoose.model('Booth', BoothSchema);

// Save (Add Booth)
module.exports.addBooth = (newBooth, callback) => {
  newBooth.save(callback);
};

// Find By Id
module.exports.getBoothById = (id, callback) => {
  Booth.findById(id, callback);
};

// Find One (By bNr)
module.exports.getBoothByBNr = (bNr, callback) => {
  const query = { bNr: bNr };
  Booth.findOne(query, callback);
};

// Find (All Booths)
module.exports.getBooths = (results, callback) => {
  Booth.find({}, results, callback);
};

// Update - Find By Id And Update
module.exports.updateBooth = (id, update, options, callback) => {
  Booth.findByIdAndUpdate(id, update, options, callback);
};

// Remove - Find By Id And Remove
module.exports.removeBooth = (id, callback) => {
  // Booth.findByIdAndRemove(id, options, callback);
  Booth.findByIdAndRemove(id, callback);
};