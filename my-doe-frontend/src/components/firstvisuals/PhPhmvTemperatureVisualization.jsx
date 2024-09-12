import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const PhPhmvTemperatureVisualization = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Response = await axios.get(
          `${API_BASE_URL}/api/waterqualityData/DateTimePHMVTemperature`
        );

        setData(Response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const generate3DData = () => {
    return {
      x: data.map((d) => d.pH),
      y: data.map((d) => d.pHMV),
      z: data.map((d) => d.Temperature),
      //   z: data.temperature.map((d) => d.Temperature),
      type: "scatter3d",
      mode: "markers",
      marker: { size: 5 },
    };
  };
  console.log(data);
  return (
    <div>
      <h2>3D Visualization of pH, pHMV, and Temperature</h2>
      <Plot
        data={[generate3DData()]}
        layout={{
          width: 800,
          height: 600,
          title: "pH, pHMV, and Temperature 3D Plot",
          scene: {
            xaxis: { title: "pH" },
            yaxis: { title: "pHMV" },
            zaxis: { title: "Temperature" },
          },
        }}
      />
    </div>
  );
};

export default PhPhmvTemperatureVisualization;
