import React, { createContext, useContext, useState, useCallback } from "react";
import { calculateVotes, getUniqueSurveyIds } from "../services/api";

const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const [voteCalc, setVoteCalc] = useState({
    result: {},
    states: [],
  });
  const [importedSurveys, setImportedSurveys] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVoteData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await calculateVotes();
      setLoading(false);
      const data = response?.data;
      setVoteCalc(data);
    } catch (error) {
      console.error("Error fetching vote data", error);
    }
  }, []);

  const getImportedSurveys = useCallback(async () => {
    try {
      const response = await getUniqueSurveyIds();
      const data = response?.data;
      setImportedSurveys(data);
    } catch (error) {
      console.error("Error fetching vote data", error);
    }
  }, []);

  return (
    <VoteContext.Provider
      value={{
        voteCalc,
        fetchVoteData,
        loading,
        importedSurveys,
        getImportedSurveys,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};

export const useVoteContext = () => {
  return useContext(VoteContext);
};
