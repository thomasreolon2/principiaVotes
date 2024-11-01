const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  population: { type: Number, required: true },
});

module.exports = mongoose.model('State', stateSchema);
