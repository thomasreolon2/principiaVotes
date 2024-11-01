import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import "./BrazilChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BrazilChart = ({ voteCalc }) => {
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    if (voteCalc) {
      const { states } = voteCalc; 
      const labels = states.map((state) => state.state);
      const candidateAData = states.map((state) => {
        const intent = state.intentions.find((i) => i.candidate_id === "A");
        return intent ? intent.vote_percent : 0;
      });
      const candidateBData = states.map((state) => {
        const intent = state.intentions.find((i) => i.candidate_id === "B");
        return intent ? intent.vote_percent : 0;
      });

      const populationData = states.map((state) => state.population); 
      
      setFilteredData({
        labels,
        candidateAData,
        candidateBData,
        populationData,
      });
    }
  }, [voteCalc]);

  const data = {
    labels: filteredData?.labels,
    datasets: [
      {
        label: "Candidato A",
        data: filteredData?.candidateAData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Candidato B",
        data: filteredData?.candidateBData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "População",
        data: filteredData?.populationData,
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        type: "line",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Intenção de Votos e População por Estado",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const datasetLabel = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw;
            return `${datasetLabel}: ${value}`;
          },
          footer: function (tooltipItems) {
            // Collect candidate data for the state of the hovered item
            const stateIndex = tooltipItems[0].dataIndex;
            const aVotePercent = filteredData.candidateAData[stateIndex] || 0;
            const bVotePercent = filteredData.candidateBData[stateIndex] || 0;

            return [
              `Candidato A: ${aVotePercent}%`,
              `Candidato B: ${bVotePercent}%`,
            ];
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BrazilChart;
