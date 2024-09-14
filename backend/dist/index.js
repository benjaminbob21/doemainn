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
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/route"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const database_1 = require("./database");
const at200_1 = require("./models/at200");
const at500_1 = require("./models/at500");
const vulink_1 = require("./models/vulink");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Other middleware setup...
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../my-doe-frontend/build")));
// Mount the data routes
app.use("/api", route_1.default);
app.get("/api/waterqualityData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query the database for a single page of data
        const data = yield at200_1.WaterQualityData.findAll({
            limit: 30,
        });
        // Send the paginated data as JSON response
        res.json(data);
    }
    catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching paginated data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/waterqualityData/Distinct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch unique combinations of Easting and Northing along with specific values of other columns
        const uniqueCoordinatesQuery = `
            SELECT DISTINCT "Easting", "Northing",
                   MIN("DateTime") AS "DateTime",
                   MIN("Salinity") AS "Salinity",
                   MIN("TotalDissolvedSolids") AS "TotalDissolvedSolids",
                   MIN("StationID") AS "StationID",
                   MIN("pH") AS "pH",
                   MIN("pHMV") AS "pHMV",
                   MIN("SaturationOxygen") AS "SaturationOxygen",
                   MIN("PartialPressureOxygen") AS "PartialPressureOxygen"
            FROM "WaterQualityData"
            GROUP BY "Easting", "Northing"
        `;
        const [uniqueCoordinates, metadataCoordinates] = yield database_1.sequelize.query(uniqueCoordinatesQuery);
        // Send the unique data as JSON response
        res.json(uniqueCoordinates);
    }
    catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching unique data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/waterqualityDataSecond/Distinct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch unique combinations of Easting and Northing along with specific values of other columns
        const uniqueCoordinatesQuery = `
            SELECT DISTINCT "Easting", "Northing",
                   MIN("DateTime") AS "DateTime",
                   MIN("Salinity") AS "Salinity",
                   MIN("TotalDissolvedSolids") AS "TotalDissolvedSolids",
                   MIN("StationID") AS "StationID"
            FROM "WaterQualityDataSeconds"
            GROUP BY "Easting", "Northing"
        `;
        const [uniqueCoordinates, metadataCoordinates] = yield database_1.sequelize.query(uniqueCoordinatesQuery);
        // Send the unique data as JSON response
        res.json(uniqueCoordinates);
    }
    catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching unique data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/batteryData/Distinct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch unique combinations of Easting and Northing along with specific values of other columns
        const uniqueCoordinatesQuery = `
            SELECT DISTINCT "Easting", "Northing",
                   MIN("DateTime") AS "DateTime",
                   MIN("BatteryLevel") AS "BatteryLevel",
                   MIN("StationID") AS "StationID",
                   MIN("Baro") AS "Baro",
                   MIN("Temperature") AS "Temperature"
            FROM "BatteryData"
            GROUP BY "Easting", "Northing"
        `;
        const [uniqueCoordinates, metadataCoordinates] = yield database_1.sequelize.query(uniqueCoordinatesQuery);
        // Send the unique data as JSON response
        res.json(uniqueCoordinates);
    }
    catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching unique data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/waterqualityDatasecond/maxmin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query the database for the maximum and minimum values of easting and northing
        const maxMinValues = yield at500_1.WaterQualityDataSecond.findOne({
            attributes: [
                [database_1.sequelize.fn("MAX", database_1.sequelize.col("Easting")), "maxEasting"],
                [database_1.sequelize.fn("MIN", database_1.sequelize.col("Easting")), "minEasting"],
                [database_1.sequelize.fn("MAX", database_1.sequelize.col("Northing")), "maxNorthing"],
                [database_1.sequelize.fn("MIN", database_1.sequelize.col("Northing")), "minNorthing"],
            ],
        });
        // Send the max and min values as JSON response
        res.json(maxMinValues);
    }
    catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching max and min values:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/batteryData/maxmin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query the database for the maximum and minimum values of easting and northing
        const maxMinValues = yield vulink_1.BatteryData.findOne({
            attributes: [
                [database_1.sequelize.fn("MAX", database_1.sequelize.col("Easting")), "maxEasting"],
                [database_1.sequelize.fn("MIN", database_1.sequelize.col("Easting")), "minEasting"],
                [database_1.sequelize.fn("MAX", database_1.sequelize.col("Northing")), "maxNorthing"],
                [database_1.sequelize.fn("MIN", database_1.sequelize.col("Northing")), "minNorthing"],
            ],
        });
        // Send the max and min values as JSON response
        res.json(maxMinValues);
    }
    catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching max and min values:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/waterqualityData/maxmin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query the database for the maximum and minimum values of easting and northing
        const maxMinValues = yield at200_1.WaterQualityData.findOne({
            attributes: [
                [database_1.sequelize.fn("MAX", database_1.sequelize.col("Easting")), "maxEasting"],
                [database_1.sequelize.fn("MIN", database_1.sequelize.col("Easting")), "minEasting"],
                [database_1.sequelize.fn("MAX", database_1.sequelize.col("Northing")), "maxNorthing"],
                [database_1.sequelize.fn("MIN", database_1.sequelize.col("Northing")), "minNorthing"],
            ],
        });
        // Send the max and min values as JSON response
        res.json(maxMinValues);
    }
    catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching max and min values:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/waterqualityData/DateTimePHMVTemperature", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield at200_1.WaterQualityData.findAll({
            attributes: ["DateTime", "pHMV", "pH", "Temperature"],
            limit: 30,
        });
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching DateTime and pHMV data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/waterqualityData/DateTimePH", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield at200_1.WaterQualityData.findAll({
            attributes: ["DateTime", "pH"],
            limit: 30,
        });
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching DateTime and pH data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/waterqualityData/DateTimePHMV", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield at200_1.WaterQualityData.findAll({
            attributes: ["DateTime", "pHMV"],
            limit: 30,
        });
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching DateTime and pHMV data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/waterqualityData/DateTimePHMV", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield at200_1.WaterQualityData.findAll({
            attributes: ["DateTime", "pH", "pHMV"],
            limit: 30,
        });
        console.log("Fetched Data: ", data);
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching DateTime, pH, and pHMV data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/waterqualityData/DateTimePHTemperature", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield at200_1.WaterQualityData.findAll({
            attributes: ["DateTime", "pH", "Temperature"],
            limit: 30,
        });
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching DateTime, pH, and Temperature data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/batteryData/DateTimeBatteryLevel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield vulink_1.BatteryData.findAll({
            attributes: ["DateTime", "BatteryLevel"],
            limit: 30,
        });
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching DateTime and BatteryLevel data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/batteryData/DateTimeTemperature", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield vulink_1.BatteryData.findAll({
            attributes: ["DateTime", "Temperature"],
            limit: 100,
        });
        res.json(data);
    }
    catch (error) {
        console.error("Error fetching DateTime and Temperature data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../my-doe-frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../my-doe-frontend/build/index.html"));
});
// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
