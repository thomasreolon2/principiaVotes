const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  state_id: { type: Number, required: true },
  name: { type: String, required: true },
  population: { type: Number, required: true },
  group: { type: Number, required: true },
});

module.exports = mongoose.model('City', citySchema);
