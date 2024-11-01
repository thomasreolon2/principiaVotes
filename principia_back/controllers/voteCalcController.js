const Survey = require("../models/Survey");
const City = require("../models/City");
const State = require("../models/State");

exports.calculateVotes = async (req, res) => {
  try {
    const allStates = await State.find();
    const states = allStates;
    const candidatesData = {};
    const stateResults = [];

 
for (const state of states) {
  const allCities = await City.find({ state_id: state.id });
  console.log(
    `Processing state: ${state.name}, Cities found: ${allCities.length}`
  );

  const cities = allCities;
  const stateCandidatesData = {};

  for (const city of cities) {
    const surveys = await Survey.find({ city_id: city.name });
    console.log(
      `Surveys for city ${city.name} (ID: ${city.id}):`,
      surveys.length
    );

    if (surveys.length === 0) {
      console.log(`No surveys found for city ${city.name}`);
      continue;
    }

    surveys.forEach((survey) => {
      const { candidate_id, vote_percent } = survey;

      if (vote_percent < 0 || vote_percent > 100) {
        return;
      }

      if (!candidatesData[candidate_id]) {
        candidatesData[candidate_id] = { totalVotes: 0, totalWeight: 0 };
      }

      if (!stateCandidatesData[candidate_id]) {
        stateCandidatesData[candidate_id] = {
          totalVotes: 0,
          totalWeight: 0,
        };
      }

      const weightedVote = (vote_percent / 100) * city.population;
      candidatesData[candidate_id].totalVotes += weightedVote;
      candidatesData[candidate_id].totalWeight += city.population;

      stateCandidatesData[candidate_id].totalVotes += weightedVote;
      stateCandidatesData[candidate_id].totalWeight += city.population;
    });
  }

  const stateIntentions = Object.keys(stateCandidatesData).map(
    (candidate_id) => {
      const candidateData = stateCandidatesData[candidate_id];
      const vote_percent =
        candidateData.totalWeight > 0
          ? (candidateData.totalVotes / candidateData.totalWeight) * 100
          : 0;

      return {
        candidate_id,
        vote_percent,
      };
    }
  );

  if (stateIntentions.length === 0) {
    console.log(`No voting intentions found for state ${state.name}`);
  }
 
  stateResults.push({
    state: state.name,
    population: state.population,   
    intentions: stateIntentions,
  });
}

    const results = Object.keys(candidatesData).map((candidate_id) => {
      const candidateData = candidatesData[candidate_id];
      const vote_percent =
        candidateData.totalWeight > 0
          ? (candidateData.totalVotes / candidateData.totalWeight) * 100
          : 0;

      console.log(
        `Candidate: ${candidate_id}, Total Vote Percent: ${vote_percent}`
      );

      return {
        candidate_id,
        vote_percent,
      };
    });

    res.status(200).json({
      results,
      states: stateResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error calculating votes" });
  }
};
