 
import React from 'react';
import './ImageDisplay.css';
import myImage from '../../assets/csvEmpty.png';  

const ImageDisplay = () => {
  return (
    <div className="image-container">
      <img src={myImage} alt="Description of the image" className="responsive-image" />
    </div>
  );
};

export default ImageDisplay;
