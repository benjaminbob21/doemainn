import fs from "fs";
import csvParser from "csv-parser";
import { WaterQualityData, WaterQualityDataAttribute } from "./models/at200";
import {
  WaterQualityDataSecond,
  WaterQualityDataSecondAttribute,
} from "./models/at500";
import { BatteryData, BatteryDataAttribute } from "./models/vulink";

async function seedWaterQualityDataFromCSV(filePath: string): Promise<void> {
  const rows: WaterQualityDataAttribute[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row: any) => {
        rows.push({
          DateTime: new Date(row["Date Time"]),
          Salinity: parseFloat(row["Salinity (psu)"]) || null,
          TotalDissolvedSolids:
            parseFloat(row["Total Dissolved Solids (mg/L)"]) || null,
          pH: parseFloat(row["pH (pH)"]) || null,
          pHMV: parseFloat(row["pH MV (mV)"]) || null,
          SaturationOxygen: parseFloat(row["% Saturation O₂ (% sat)"]) || null,
          PartialPressureOxygen:
            parseFloat(row["Partial Pressure O₂ (psi)"]) || null,
          StationID: row["station_id"],
          Easting: parseFloat(row["easting"]) || null,
          Northing: parseFloat(row["northing"]) || null,
          Temperature: parseFloat(row["Temperature (C)"]) || null,
        });
      })
      .on("end", async () => {
        try {
          // Insert in batches to avoid overwhelming the database
          const batchSize = 100;
          for (let i = 0; i < rows.length; i += batchSize) {
            const batch = rows.slice(i, i + batchSize);
            await WaterQualityData.bulkCreate(batch);
          }
          console.log(
            "Data seeding completed successfully for WaterQualityData."
          );
          resolve();
        } catch (error) {
          console.error("Error seeding data for WaterQualityData:", error);
          reject(error);
        }
      })
      .on("error", (error: Error) => {
        console.error("Error reading CSV file for WaterQualityData:", error);
        reject(error);
      });
  });
}

async function seedWaterQualityDataSecondFromCSV(
  filePath: string
): Promise<void> {
  const rows: WaterQualityDataSecondAttribute[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row: any) => {
        rows.push({
          DateTime: new Date(row["Date Time"]),
          Salinity: parseFloat(row["Salinity (psu)"]) || null,
          TotalDissolvedSolids:
            parseFloat(row["Total Dissolved Solids (mg/L)"]) || null,
          StationID: row["station_id"],
          Easting: parseFloat(row["easting"]) || null,
          Northing: parseFloat(row["northing"]) || null,
        });
      })
      .on("end", async () => {
        try {
          const batchSize = 100;
          for (let i = 0; i < rows.length; i += batchSize) {
            const batch = rows.slice(i, i + batchSize);
            await WaterQualityDataSecond.bulkCreate(batch);
          }
          console.log(
            "Data seeding completed successfully for WaterQualityDataSecond."
          );
          resolve();
        } catch (error) {
          console.error(
            "Error seeding data for WaterQualityDataSecond:",
            error
          );
          reject(error);
        }
      })
      .on("error", (error: Error) => {
        console.error(
          "Error reading CSV file for WaterQualityDataSecond:",
          error
        );
        reject(error);
      });
  });
}

async function seedBatteryDataFromCSV(filePath: string): Promise<void> {
  const rows: BatteryDataAttribute[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row: any) => {
        rows.push({
          DateTime: new Date(row["Date Time"]),
          BatteryLevel: parseFloat(row["Battery Level (%)"]) || null,
          StationID: row["station_id"],
          Baro: row["Baro (psi)"] ? parseFloat(row["Baro (psi)"]) : null,
          Temperature: row["Temperature (C)"]
            ? parseFloat(row["Temperature (C)"])
            : null,
          Easting: parseFloat(row["easting"]) || null,
          Northing: parseFloat(row["northing"]) || null,
        });
      })
      .on("end", async () => {
        try {
          const batchSize = 100;
          for (let i = 0; i < rows.length; i += batchSize) {
            const batch = rows.slice(i, i + batchSize);
            await BatteryData.bulkCreate(batch);
          }
          console.log("Data seeding completed successfully for BatteryData.");
          resolve();
        } catch (error) {
          console.error("Error seeding data for BatteryData:", error);
          reject(error);
        }
      })
      .on("error", (error: Error) => {
        console.error("Error reading CSV file for BatteryData:", error);
        reject(error);
      });
  });
}

// Usage
const waterQualityDataFilePath = "../../data/csv_files/at200.csv";
const waterQualityDataSecondFilePath = "../../data/csv_files/at500.csv";
const batteryDataFilePath = "../../data/csv_files/vulink.csv";

Promise.all([
  seedWaterQualityDataFromCSV(waterQualityDataFilePath),
  seedWaterQualityDataSecondFromCSV(waterQualityDataSecondFilePath),
  seedBatteryDataFromCSV(batteryDataFilePath),
])
  .then(() => {
    console.log("Data seeding completed for all tables.");
  })
  .catch((error: Error) => {
    console.error("Error seeding data:", error);
  });
