import React, { useState, useEffect } from "react";
import axios from "axios";
import LottieAnimation from "./Load";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

function RectangleVisualization3() {
  const [minMaxValues, setMinMaxValues] = useState({
    minEasting: null,
    maxEasting: null,
    minNorthing: null,
    maxNorthing: null,
  });
  const [data, setData] = useState([]);
  const [scaledPoints, setScaledPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const minMaxResponse = await axios.get(
          `${API_BASE_URL}/api/batteryData/maxmin`
        );
        setMinMaxValues(minMaxResponse.data);

        const dataResponse = await axios.get(
          `${API_BASE_URL}/api/batteryData/Distinct`
        );
        setData(dataResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateScaledValue = (value, minValue, maxValue) => {
      if (maxValue === null) {
        maxValue = minValue * 1.1; // Handle null values by providing a slight margin
      }

      const scaledValue = ((value - minValue) / (maxValue - minValue)) * 10;
      // Clamp the scaled value between 0 and 100
      return Math.min(Math.max(scaledValue, 0), 10);
    };

    if (data && minMaxValues) {
      const newScaledPoints = data.map((values, index) => ({
        scaledX: calculateScaledValue(
          values.Easting,
          minMaxValues.minEasting,
          minMaxValues.maxEasting
        ),
        scaledY: calculateScaledValue(
          values.Northing,
          minMaxValues.minNorthing,
          minMaxValues.maxNorthing
        ),
        ...values, // Include other data for the point
      }));

      setScaledPoints(newScaledPoints);
    }
  }, [data, minMaxValues]);
  if (isLoading) {
    return <LottieAnimation />;
  }

  console.log(scaledPoints);
  console.log(data);
  console.log(minMaxValues);

  return (
    <div className="relative w-[80%] mt-[200px] ml-[50px] border-[5px] border-solid border-blue-600 rounded-lg p-5 box-border bg-[#00bfff]">
      <div className="w-full text-center text-[aliceblue]">
        <h1 className=" text-3xl font-bold">
          Battery Data Quality Visualization
        </h1>
      </div>
      <div className="relative w-full h-[500px] border-[5px] border-blue-600 rounded-lg">
        {scaledPoints.map((point, index) => (
          <div
            key={index}
            className="absolute w-[10px] h-[10px] bg-red-500 rounded-full cursor-pointer"
            style={{
              left: `${point.scaledX * 1000}%`,
              top: `${point.scaledY * 1000}%`,
            }}
            onMouseEnter={() => setSelectedPoint(point)}
            onMouseLeave={() => setSelectedPoint(null)}
            onClick={() => setSelectedPoint(point)}
          >
            {selectedPoint === point && (
              <div className="absolute text-xs text-black bg-white p-1 border border-white rounded bottom-[15px] -left-1/2 transform -translate-x-1/2">
                <p>Easting: {point.Easting}</p>
                <p>Northing: {point.Northing}</p>
                <p>DateTime: {point.DateTime}</p>
                <p>BatteryLevel: {point.BatteryLevel}</p>
                <p>Temperature: {point.Temperature}</p>
                <p>StationID: {point.StationID}</p>
                <p>Baro: {point.Baro}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RectangleVisualization3;
