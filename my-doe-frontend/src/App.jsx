// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const PaginatedData = () => {
// //     const [data, setData] = useState([]);
// //     const [page, setPage] = useState(1);
// //     // const [pageSize] = useState(10); // You can adjust this based on your backend setup

// //     useEffect(() => {
// //         fetchData();
// //         // eslint-disable-next-line react-hooks/exhaustive-deps
// //     }, [page]); // Fetch data whenever the page state changes

// //     const fetchData = async () => {
// //         try {
// //             const response = await axios.get(`http://localhost:3000/api/waterqualityData`);
// //             console.log(response)
// //             setData(response.data);
// //         } catch (error) {
// //             console.error('Error fetching data:', error);
// //         }
// //     };
// //     return (
// //         <div>
// //             <h1>Water Quality Data</h1>
// //             <ul>
// //                 {data.map(item => (
// //                     <li key={item.id}>
// //                         <p>ID: {item.id}</p>
// //                         <p>DateTime: {item.DateTime}</p>
// //                         <p>Salinity: {item.Salinity}</p>
// //                         <p>TotalDissolvedSolids: {item.TotalDissolvedSolids}</p>
// //                         <p>pH: {item.pH}</p>
// //                         <p>pHMV: {item.pHMV}</p>
// //                         <p>SaturationOxygen: {item.SaturationOxygen}</p>
// //                         <p>PartialPressureOxygen: {item.PartialPressureOxygen}</p>
// //                         <p>StationID: {item.StationID}</p>
// //                         <p>Easting: {item.Easting}</p>
// //                         <p>Northing: {item.Northing}</p>
// //                         {/* Render other item data here */}
// //                     </li>
// //                 ))}
// //             </ul>
// //             <div>
// //                 <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}>Previous</button>
// //                 <button onClick={() => setPage(prevPage => prevPage + 1)}>Next</button>
// //             </div>
// //         </div>
// //     );
// // };

// // export default PaginatedData;

import React from "react";
import Mainnav from "./components/Mainnav";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {

  return (
    <>
      <h1 className="pt-[60px] pb-2 text-blue-500 font-bold text-3xl tracking-tight">
        Data Analysis
      </h1>
      <h1 className="pb-16 text-blue-500 tracking-tight">
        Slide from one dataset to another with ease!
      </h1>
      <Mainnav/>
    </>
  );
}

export default App;