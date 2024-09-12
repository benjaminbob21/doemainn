import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const PhPhmvVisualization = () => {
  const [data, setData] = useState({ ph: [], phmv: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/waterqualityData/DateTimePHMV`
        );
        setData({
          ph: response.data.map((d) => d.pH),
          phmv: response.data.map((d) => d.pHMV),
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>pH vs pHMV Visualization</h2>
      <Plot
        data={[
          {
            x: data.ph,
            y: data.phmv,
            type: "scatter",
            mode: "markers",
            marker: { color: "blue" },
          },
        ]}
        layout={{ width: 800, height: 600, title: "pH vs pHMV" }}
      />
    </div>
  );
};

export default PhPhmvVisualization;
