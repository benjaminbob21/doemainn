import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const PhTemperatureVisualization = () => {
  const [data, setData] = useState({ ph: [], temperature: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/waterqualityData/DateTimePHTemperature`
        );
        setData({
          ph: response.data.map((d) => d.pH),
          temperature: response.data.map((d) => d.Temperature),
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>pH vs Temperature Visualization</h2>
      <Plot
        data={[
          {
            x: data.ph,
            y: data.temperature,
            type: "scatter",
            mode: "markers",
            marker: { color: "red" },
          },
        ]}
        layout={{ width: 800, height: 600, title: "pH vs Temperature" }}
      />
    </div>
  );
};

export default PhTemperatureVisualization;
