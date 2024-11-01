const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  id: { type: String, required: true },  
  date: { type: Date, required: true },
  city_id: { type: String, required: true }, 
  candidate_id: { type: String, required: true }, 
  vote_percent: { type: Number, required: true },
});

module.exports = mongoose.model('Survey', surveySchema);
