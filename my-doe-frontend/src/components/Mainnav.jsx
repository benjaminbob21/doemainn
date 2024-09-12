import Slidedata1 from "./firstvisuals/Slidedata1";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Slidedata2 from "./secondvisuals/Slidedata2";
import Slidedata3 from "./thirdvisuals/Slidedata3";

const NextArrow = ({ onClick, currentSlide, slideCount }) => {
  return (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 right-[85px] shadow-md bg-gray-100 text-black rounded-full w-10 h-10 flex justify-center items-center cursor-pointer z-10 ${
        currentSlide === slideCount - 1 ? "opacity-50" : ""
      }`}
      onClick={currentSlide === slideCount - 1 ? null : onClick}
    >
      <i className="fas fa-chevron-right"></i>
    </div>
  );
};

const PrevArrow = ({ onClick, currentSlide }) => {
  return (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 left-[85px] shadow-md bg-gray-100 text-black rounded-full w-10 h-10 flex justify-center items-center cursor-pointer z-10 ${
        currentSlide === 0 ? "opacity-50" : ""
      }`}
      onClick={currentSlide === 0 ? null : onClick}
    >
      <i className="fas fa-chevron-left"></i>
    </div>
  );
};

const Mainnav = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = 2; // Update this to the total number of slides

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <NextArrow currentSlide={currentSlide} slideCount={slideCount} />
    ),
    prevArrow: <PrevArrow currentSlide={currentSlide} />,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <Slider {...settings}>
      <div>
        <Slidedata1 />
      </div>
      <div>
        <Slidedata2 />
      </div>
      <div>
        <Slidedata3/>
      </div>
    </Slider>
  );
};

export default Mainnav;
