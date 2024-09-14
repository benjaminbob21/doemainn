import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/load3.json"; // Update the path accordingly

const LottieAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={800} width={800} />
    </div>
  );
};

export default LottieAnimation;
