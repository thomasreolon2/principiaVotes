import React from "react";
import UpdateButton from "./components/UpdateButton/UpdateButton";
import UploadSurvey from "./components/UploadSurvey/UploadSurvey";
import Dashboard from "./components/Dashboard/Dashboard";
import { VoteProvider } from "./contexts/VoteContext";
import "./App.css";
function App() {
  return (
    <VoteProvider>
      <div className="main-container">
        <h1>Dashboard de Intenção de Votos</h1>
        <div className="button-container">
          <UploadSurvey />
          <UpdateButton />
        </div>
        <Dashboard />
      </div>
    </VoteProvider>
  );
}

export default App;
