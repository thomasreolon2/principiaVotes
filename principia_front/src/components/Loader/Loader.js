import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/importing-loading-animation.json";
import "./Loader.css";
import {
  messageLoadingInterval,
  loadingMessages,
} from "../../contants/loading";

const Loading = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(
        (prevIndex) => (prevIndex + 1) % loadingMessages.length
      );
    }, messageLoadingInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          style={{ width: 150, height: 150 }}
        />
        <p>{loadingMessages[currentMessageIndex]}</p>
      </div>
    </div>
  );
};

export default Loading;
