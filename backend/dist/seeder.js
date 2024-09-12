"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const at200_1 = require("./models/at200");
const at500_1 = require("./models/at500");
const vulink_1 = require("./models/vulink");
function seedWaterQualityDataFromCSV(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = [];
        return new Promise((resolve, reject) => {
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on("data", (row) => {
                rows.push({
                    DateTime: new Date(row["Date Time"]),
                    Salinity: parseFloat(row["Salinity (psu)"]),
                    TotalDissolvedSolids: parseFloat(row["Total Dissolved Solids (mg/L)"]),
                    pH: parseFloat(row["pH (pH)"]),
                    pHMV: parseFloat(row["pH MV (mV)"]),
                    SaturationOxygen: parseFloat(row["% Saturation O₂ (% sat)"]),
                    PartialPressureOxygen: parseFloat(row["Partial Pressure O₂ (psi)"]),
                    StationID: row["station_id"],
                    Easting: parseFloat(row["easting"]),
                    Northing: parseFloat(row["northing"]),
                    Temperature: parseFloat(row["Temperature (C)"]),
                });
            })
                .on("end", () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield at200_1.WaterQualityData.bulkCreate(rows);
                    console.log("Data seeding completed successfully for WaterQualityData.");
                    resolve();
                }
                catch (error) {
                    console.error("Error seeding data for WaterQualityData:", error);
                    reject(error);
                }
            }))
                .on("error", (error) => {
                console.error("Error reading CSV file for WaterQualityData:", error);
                reject(error);
            });
        });
    });
}
function seedWaterQualityDataSecondFromCSV(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = [];
        return new Promise((resolve, reject) => {
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on("data", (row) => {
                rows.push({
                    DateTime: new Date(row["Date Time"]),
                    Salinity: parseFloat(row["Salinity (psu)"]),
                    TotalDissolvedSolids: parseFloat(row["Total Dissolved Solids (mg/L)"]),
                    StationID: row["station_id"],
                    Easting: parseFloat(row["easting"]),
                    Northing: parseFloat(row["northing"]),
                });
            })
                .on("end", () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield at500_1.WaterQualityDataSecond.bulkCreate(rows);
                    console.log("Data seeding completed successfully for WaterQualityDataSecond.");
                    resolve();
                }
                catch (error) {
                    console.error("Error seeding data for WaterQualityDataSecond:", error);
                    reject(error);
                }
            }))
                .on("error", (error) => {
                console.error("Error reading CSV file for WaterQualityDataSecond:", error);
                reject(error);
            });
        });
    });
}
function seedBatteryDataFromCSV(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = [];
        return new Promise((resolve, reject) => {
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on("data", (row) => {
                rows.push({
                    DateTime: new Date(row["Date Time"]),
                    BatteryLevel: parseFloat(row["Battery Level (%)"]),
                    StationID: row["station_id"],
                    Baro: row["Baro (psi)"] ? parseFloat(row["Baro (psi)"]) : null,
                    Temperature: row["Temperature (C)"]
                        ? parseFloat(row["Temperature (C)"])
                        : null,
                    Easting: parseFloat(row["easting"]),
                    Northing: parseFloat(row["northing"]),
                });
            })
                .on("end", () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield vulink_1.BatteryData.bulkCreate(rows);
                    console.log("Data seeding completed successfully for BatteryData.");
                    resolve();
                }
                catch (error) {
                    console.error("Error seeding data for BatteryData:", error);
                    reject(error);
                }
            }))
                .on("error", (error) => {
                console.error("Error reading CSV file for BatteryData:", error);
                reject(error);
            });
        });
    });
}
// Usage
const waterQualityDataFilePath = "./data/csv_files/at200.csv";
const waterQualityDataSecondFilePath = "./data/csv_files/at500.csv";
const batteryDataFilePath = "./data/csv_files/vulink.csv";
Promise.all([
    seedWaterQualityDataFromCSV(waterQualityDataFilePath),
    seedWaterQualityDataSecondFromCSV(waterQualityDataSecondFilePath),
    seedBatteryDataFromCSV(batteryDataFilePath),
])
    .then(() => {
    console.log("Data seeding completed for all tables.");
})
    .catch((error) => {
    console.error("Error seeding data:", error);
});
