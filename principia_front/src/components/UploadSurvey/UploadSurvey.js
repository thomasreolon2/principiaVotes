import React, { useEffect, useState } from "react";
import { importSurvey } from "../../services/api";
import { formatDate } from "../../utils/formatDate";
import Papa from "papaparse";
import FileUploader from "../FileUploader/FileUploader";
import Loading from "../Loader/Loader";
import "./UploadSurvey.css";
import { useVoteContext } from "../../contexts/VoteContext";
import IdListBox from "../Lists/idListBox";
const UploadSurvey = () => {
  const [surveyFile, setSurveyFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { fetchVoteData, getImportedSurveys, importedSurveys } =
    useVoteContext();

  useEffect(() => {
    const surveys = async () => {
      await getImportedSurveys();
    };
    surveys();
  }, []);

  const handleUpload = async (file) => {
    setLoading(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const text = new TextDecoder("ISO-8859-1").decode(e.target.result);
        const rawData = Papa.parse(text, { header: true }).data;

        const formattedData = rawData.map((item) => {
          const id = item.ID_PESQUISA;
          const date = formatDate(item.DATA_PESQUISA);
          const city = item["MUNICÍPIO"];
          const state = item.ESTADO;
          const candidate_vote = item["INTENÇÃO DE VOTO"];

          return { id, date, city, state, candidate_vote };
        });

        const validData = formattedData.filter(
          (item) =>
            item.id &&
            item.date &&
            item.city &&
            (item.candidate_vote === "A" || item.candidate_vote === "B")
        );

        if (validData.length === 0) {
          console.error("Nenhum dado válido encontrado para importação.");
          alert("Nenhum dado válido para importar");
          setLoading(false);
          return;
        }

        const votesByState = validData.reduce((acc, item) => {
          const { state, candidate_vote } = item;

          if (!acc[state]) {
            acc[state] = { A: 0, B: 0 };
          }
          acc[state][candidate_vote] += 1;

          return acc;
        }, {});

        const groupedData = validData.reduce((acc, item) => {
          const { id, date, city, state, candidate_vote } = item;

          let surveyEntry = acc.find(
            (entry) =>
              entry.id === id && entry.date === date && entry.city_id === city
          );

          if (!surveyEntry) {
            surveyEntry = {
              id,
              date,
              city_id: city,
              state,
              candidate_votes: [
                { candidate_id: "A", vote_count: 0, vote_percent: 0 },
                { candidate_id: "B", vote_count: 0, vote_percent: 0 },
              ],
            };
            acc.push(surveyEntry);
          }

          const candidateEntry = surveyEntry.candidate_votes.find(
            (vote) => vote.candidate_id === candidate_vote
          );
          if (candidateEntry) {
            candidateEntry.vote_count += 1;
          }

          return acc;
        }, []);

        groupedData.forEach((entry) => {
          const stateVotes = votesByState[entry.state];
          const totalVotes = stateVotes.A + stateVotes.B;

          entry.candidate_votes.forEach((candidate) => {
            candidate.vote_percent =
              totalVotes > 0
                ? (
                    (stateVotes[candidate.candidate_id] / totalVotes) *
                    100
                  ).toFixed(2)
                : 0;
          });
        });

        await importSurvey(groupedData);
        setLoading(false);
        alert("Importado com sucesso!!");
        await getImportedSurveys();
        await fetchVoteData();
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert(`ID ${error.response.data.id} já foi importado antes.`);
        } else {
          alert("Erro ao importar pesquisa");
        }
      } finally {
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="container">
      <FileUploader
        onFileChange={(file) => {
          setSurveyFile(file);
          handleUpload(file);
        }}
        surveyFile={surveyFile}
      />
      {importedSurveys?.length > 0 && <IdListBox ids={importedSurveys} />}
      {loading && <Loading />}
    </div>
  );
};

export default UploadSurvey;
