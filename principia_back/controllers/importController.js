const Survey = require('../models/Survey');

exports.importSurvey = async (req, res) => {
  try {
    const surveys = req.body;

    if (!Array.isArray(surveys)) {
      return res.status(400).json({ message: 'The survey payload must be an array' });
    }

    const surveyEntries = [];

    for (const survey of surveys) {
      const { id, date, city_id, candidate_votes} = survey;

      if (!Array.isArray(candidate_votes) || candidate_votes.length !== 2) {
        return res.status(400).json({ message: 'Each survey must have two candidate votes (A and B)' });
      }

      const existingSurvey = await Survey.findOne({ id, date: new Date(date), city_id: String(city_id) });
      if (existingSurvey) {
        return res.status(409).json({
          error: 'Conflict: A survey with this ID already exists.',
          id: survey.id
        });
      }

      for (const candidate of candidate_votes) {
        surveyEntries.push({
          id,
          date: new Date(date),
          city_id: String(city_id),
          candidate_id: String(candidate.candidate_id),
          vote_percent: candidate.vote_percent,
        });
      }
    }
   console.log(surveyEntries)
    await Survey.insertMany(surveyEntries);
    res.status(201).json({ message: 'Surveys imported successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error importing surveys' });
  }
};
 
exports.getUniqueSurveyIds = async (req, res) => {
    try {
      const uniqueIds = await Survey.distinct('id');  
      res.status(200).json(uniqueIds); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving unique survey IDs' });
    }
  };
  