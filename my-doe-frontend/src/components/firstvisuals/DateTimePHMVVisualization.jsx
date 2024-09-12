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

const DateTimePHMVVisualization = () => {
  const [data, setData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/waterqualityData/DateTimePHMV`
        );
        const responseData = response.data;

        const chartData = {
          labels: responseData.map((d) =>
            new Date(d.DateTime).toLocaleString()
          ),
          datasets: [
            {
              label: "pH MV",
              data: responseData.map((d) => d.pHMV),
              borderColor: "rgba(153, 102, 255, 1)",
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
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Water Quality Visualization (DateTime vs pH MV)</h2>
      <Line ref={chartRef} data={data} />
    </div>
  );
};

export default DateTimePHMVVisualization;
