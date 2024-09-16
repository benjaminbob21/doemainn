import React, { useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LottieAnimation from "../Load";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fetchWaterQualityData = async () => {
  const { data } = await axios.get(
    `${API_BASE_URL}/api/waterqualityData/DateTimePHMV`
  );
  return data;
};

const DateTimePHMVVisualization = () => {
  const chartRef = useRef(null);

  // Using useQuery to fetch data and track loading state
  const { data, isLoading, error } = useQuery(
    "waterQualityData",
    fetchWaterQualityData
  );

  // Handling loading and error states
  if (isLoading) {
    return <LottieAnimation />;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  // Preparing chart data
  const chartData = {
    labels: data.map((d) => new Date(d.DateTime).toLocaleString()),
    datasets: [
      {
        label: "pH MV",
        data: data.map((d) => d.pHMV),
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h2>Water Quality Visualization (DateTime vs pH MV)</h2>
      <Line ref={chartRef} data={chartData} />
    </div>
  );
};

export default DateTimePHMVVisualization;