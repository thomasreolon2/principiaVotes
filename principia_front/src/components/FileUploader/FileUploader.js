import React from "react";
import "./FileUploader.css";
import { FiFolder } from "react-icons/fi";

const FileUploader = ({ onFileChange, surveyFile }) => {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    onFileChange(event.dataTransfer.files[0]);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div
        className={`upload-area ${isDragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => onFileChange(e.target.files[0])}
          className="file-input"
        />
        <span className="upload-icon">
          <FiFolder size={48} />
        </span>
        <p>
          {surveyFile
            ? surveyFile.name
            : "Arraste e solte um arquivo aqui ou clique para selecionar"}
        </p>
      </div>
    </div>
  );
};

export default FileUploader;
