import React, { useEffect, useState } from "react";
import BrazilChart from "../BrazilChart/BrazilChart";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/calculate-loading-animation.json";
import "./Dashboard.css";
import { useVoteContext } from "../../contexts/VoteContext";

const Dashboard = () => {
  const { voteCalc, fetchVoteData, loading, importedSurveys } =
    useVoteContext();

  useEffect(() => {
    const loadData = async () => {
      await fetchVoteData();
    };
    loadData();
  }, [fetchVoteData]);

  if (loading && importedSurveys?.length > 0) {
    return (
      <div className="loading-container">
        <h4 className="loading-title">Calculando intenção de votos...</h4>
        <h6 className="description">Isso pode levar até 1-2 minutos...</h6>
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    );
  }

  return (
    importedSurveys?.length > 0 && (
      <div className="chart-container">
        <BrazilChart voteCalc={voteCalc} />
      </div>
    )
  );
};

export default Dashboard;
