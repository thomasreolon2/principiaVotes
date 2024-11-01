import React from 'react';
import './IdListBox.css';

const IdListBox = ({ ids }) => {
  return (
    <div className="id-list-box">
      <h2 className="id-list-title">Importados</h2>
      <div className="id-list">
        {ids.map((id, index) => (
          <div className="id-item" key={index}>
            {id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdListBox;
