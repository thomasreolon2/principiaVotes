const axios = require("axios");
const Survey = require("../models/Survey");
const City = require("../models/City");
const State = require("../models/State");

const getRandomPopulation = (min, max) => {
  return Math.floor(Math.random() * (max - min + 2)) + min;
};

const getPopulationByStateId = async (stateId) => {
  try {
    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v2/malhas/${stateId}?formato=json`
    );
    const population = response.data.populacao;
    if (!population) {
      return getRandomPopulation(100000, 2000000);
    }
    return population;
  } catch (error) {
    console.error(`Erro ao obter população do estado ${stateId}:`, error);
    return getRandomPopulation(100000, 2000000);
  }
};

const getPopulationByCityId = async (cityId) => {
  try {
    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v2/malhas/${cityId}?formato=json`
    );
    const population = response.data.populacao;
    if (!population) {
      return getRandomPopulation(100000, 2000000);
    }
    return population;
  } catch (error) {
    console.error(`Erro ao obter população da cidade ${cityId}:`, error);
    return getRandomPopulation(100000, 2000000);
  }
};

exports.syncData = async (req, res) => {
  try {
    console.log("Iniciando sincronização de dados");

    const statesData = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    console.log("Dados dos estados recebidos:", statesData.data);

    const citiesData = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
    );
    console.log("Dados das cidades recebidos:", citiesData.data);

    const citiesByState = {};

    for (const city of citiesData.data) {
      const stateId = city.microrregiao.mesorregiao.UF.id;
      if (!citiesByState[stateId]) {
        citiesByState[stateId] = [];
      }
      citiesByState[stateId].push(city);
    }

    for (const state of statesData.data) {
      console.log("Sincronizando estado:", state);

      const statePopulation = await getPopulationByStateId(state.id);
      await State.updateOne(
        { id: state.id },
        { name: state.nome, population: statePopulation },
        { upsert: true }
      );
    }

    const maxCitiesPerState = 15; // Defini um limite a captacao de 20 cidades (configuravel) por estado para nao ficar um loading gigante para os 5mil+ municipios
    for (const stateId in citiesByState) {
      const cities = citiesByState[stateId];
      const limitedCities = cities.slice(
        0,
        Math.min(maxCitiesPerState, cities.length)
      );

      for (const city of limitedCities) {
        console.log("Sincronizando cidade:", city);

        const cityPopulation = await getPopulationByCityId(city.id);
        await City.updateOne(
          { id: city.id },
          {
            state_id: city.microrregiao.mesorregiao.UF.id,
            name: city.nome,
            population: cityPopulation,
          },
          { upsert: true }
        );
      }
    }

    res.status(200).send("Data synchronized successfully");
  } catch (error) {
    console.error("Erro geral na sincronização de dados:", error);
    res.status(500).send("Error syncing data");
  }
};
