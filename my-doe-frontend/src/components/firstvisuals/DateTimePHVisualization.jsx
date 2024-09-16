import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
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

const DateTimePHVisualization = () => {
  const [data, setData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/waterqualityData/DateTimePH`
        );
        const responseData = response.data;

        const chartData = {
          labels: responseData.map((d) =>
            new Date(d.DateTime).toLocaleString()
          ),
          datasets: [
            {
              label: "pH",
              data: responseData.map((d) => d.pH),
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
            },
          ],
        };

        setData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (!data) {
    return <LottieAnimation />;
  }

  return (
    <div>
      <h2>Water Quality Visualization (DateTime vs pH)</h2>
      <Line ref={chartRef} data={data} />
    </div>
  );
};

export default DateTimePHVisualization;
