const mongoose = require('mongoose');
config = require('../config/database');

// BoothCard Schema
const BoothCardSchema = mongoose.Schema({
  bCNr: { type: Number },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Booth' },
  booths: { type: mongoose.Schema.Types.ObjectId, ref: 'Booth' },
  cdate: Date,
  amount: Number,
  categories: [{ type: String, index: true }],
  commission: { type: Number },
  comments: { type: String },
  created: { type: Date, default: Date.now }
});

const BoothCard = module.exports = mongoose.model('BoothCard', BoothCardSchema);

// Save (Add BoothCard)
module.exports.addBoothCard = (newBoothCard, callback) => {
  newBoothCard.save(callback);
};

// Find By Id
module.exports.getBoothCardById = (id, callback) => {
  BoothCard.findById(id, callback);
};

// Find One (By bCNr)
module.exports.getBoothCardByBCNr = (bCNr, callback) => {
  const query = { bCNr: bCNr };
  BoothCard.findOne(query, callback);
};

// Find (All BoothCards)
module.exports.getBoothCards = (results, callback) => {
  BoothCard.find({}, results, callback);
};

// Update - Find By Id And Update
module.exports.updateBoothCard = (id, update, options, callback) => {
  BoothCard.findByIdAndUpdate(id, update, options, callback);
};

// Remove - Find By Id And Remove
module.exports.removeBoothCard = (id, callback) => {
  // BoothCard.findByIdAndRemove(id, options, callback);
  BoothCard.findByIdAndRemove(id, callback);
};