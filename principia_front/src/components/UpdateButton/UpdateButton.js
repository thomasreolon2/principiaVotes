import React, { useState } from "react";
import { syncData } from "../../services/api";
import "./UpdateButton.css";
const UpdateButton = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await syncData();
      alert("Base de dados atualizada com sucesso");
    } catch (error) {
      alert("Erro ao atualizar a base de dados");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-container">
      <label>
        Atualização automática, horário programado: <b>12:00</b>
      </label>

      <button onClick={handleClick} disabled={loading}>
        {loading ? "Atualizando... (até 1-2 minutos)" : "Atualizar Base"}
      </button>
      {loading && <div className="spinner"></div>}
    </div>
  );
};

export default UpdateButton;
