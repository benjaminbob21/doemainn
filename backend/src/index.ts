import express, { Request, Response } from "express";
import route from "./routes/route";
import cors from "cors";
import "dotenv/config";
import { sequelize } from "./database";
import { WaterQualityData } from "./models/at200";
import { WaterQualityDataSecond } from "./models/at500";
import { BatteryData } from "./models/vulink";
import cookieParser from "cookie-parser";
import path from "path";


const app = express();

// Other middleware setup...
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../my-doe-frontend/build")));


// Mount the data routes
app.use("/api", route);

app.get("/api/waterqualityData", async (req: Request, res: Response) => {
  try {
    // Query the database for a single page of data
    const data = await WaterQualityData.findAll({
      limit: 30,
    });

    // Send the paginated data as JSON response
    res.json(data);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching paginated data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/waterqualityData/Distinct", async (req: Request, res: Response) => {
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
    const [uniqueCoordinates, metadataCoordinates] = await sequelize.query(
      uniqueCoordinatesQuery
    );

    // Send the unique data as JSON response
    res.json(uniqueCoordinates);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching unique data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/waterqualityDataSecond/Distinct", async (req: Request, res: Response) => {
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
    const [uniqueCoordinates, metadataCoordinates] = await sequelize.query(
      uniqueCoordinatesQuery
    );

    // Send the unique data as JSON response
    res.json(uniqueCoordinates);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching unique data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/batteryData/Distinct", async (req: Request, res: Response) => {
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
    const [uniqueCoordinates, metadataCoordinates] = await sequelize.query(
      uniqueCoordinatesQuery
    );

    // Send the unique data as JSON response
    res.json(uniqueCoordinates);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching unique data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/waterqualityDatasecond/maxmin", async (req: Request, res: Response) => {
  try {
    // Query the database for the maximum and minimum values of easting and northing
    const maxMinValues = await WaterQualityDataSecond.findOne({
      attributes: [
        [sequelize.fn("MAX", sequelize.col("Easting")), "maxEasting"],
        [sequelize.fn("MIN", sequelize.col("Easting")), "minEasting"],
        [sequelize.fn("MAX", sequelize.col("Northing")), "maxNorthing"],
        [sequelize.fn("MIN", sequelize.col("Northing")), "minNorthing"],
      ],
    });

    // Send the max and min values as JSON response
    res.json(maxMinValues);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching max and min values:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/api/batteryData/maxmin", async (req: Request, res: Response) => {
  try {
    // Query the database for the maximum and minimum values of easting and northing
    const maxMinValues = await BatteryData.findOne({
      attributes: [
        [sequelize.fn("MAX", sequelize.col("Easting")), "maxEasting"],
        [sequelize.fn("MIN", sequelize.col("Easting")), "minEasting"],
        [sequelize.fn("MAX", sequelize.col("Northing")), "maxNorthing"],
        [sequelize.fn("MIN", sequelize.col("Northing")), "minNorthing"],
      ],
    });

    // Send the max and min values as JSON response
    res.json(maxMinValues);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching max and min values:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/api/waterqualityData/maxmin", async (req: Request, res: Response) => {
  try {
    // Query the database for the maximum and minimum values of easting and northing
    const maxMinValues = await WaterQualityData.findOne({
      attributes: [
        [sequelize.fn("MAX", sequelize.col("Easting")), "maxEasting"],
        [sequelize.fn("MIN", sequelize.col("Easting")), "minEasting"],
        [sequelize.fn("MAX", sequelize.col("Northing")), "maxNorthing"],
        [sequelize.fn("MIN", sequelize.col("Northing")), "minNorthing"],
      ],
    });

    // Send the max and min values as JSON response
    res.json(maxMinValues);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching max and min values:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/waterqualityData/DateTimePHMVTemperature", async (req: Request, res: Response) => {
  try {
    const data = await WaterQualityData.findAll({
      attributes: ["DateTime", "pHMV", "pH", "Temperature"],
      limit: 30,
    });
    res.json(data);
  } catch (error) {
    console.error("Error fetching DateTime and pHMV data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/waterqualityData/DateTimePH", async (req: Request, res: Response) => {
  try {
    const data = await WaterQualityData.findAll({
      attributes: ["DateTime", "pH"],
      limit: 30,
    });
    res.json(data);
  } catch (error) {
    console.error("Error fetching DateTime and pH data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/waterqualityData/DateTimePHMV", async (req: Request, res: Response) => {
  try {
    const data = await WaterQualityData.findAll({
      attributes: ["DateTime", "pHMV"],
      limit: 30,
    });
    res.json(data);
  } catch (error) {
    console.error("Error fetching DateTime and pHMV data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/waterqualityData/DateTimePHMV", async (req: Request, res: Response) => {
  try {
    const data = await WaterQualityData.findAll({
      attributes: ["DateTime", "pH", "pHMV"],
      limit: 30,
    });
    console.log("Fetched Data: ", data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching DateTime, pH, and pHMV data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/waterqualityData/DateTimePHTemperature", async (req: Request, res: Response) => {
  try {
    const data = await WaterQualityData.findAll({
      attributes: ["DateTime", "pH", "Temperature"],
      limit: 30,
    });
    res.json(data);
  } catch (error) {
    console.error("Error fetching DateTime, pH, and Temperature data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/batteryData/DateTimeBatteryLevel", async (req: Request, res: Response) => {
  try {
    const data = await BatteryData.findAll({
      attributes: ["DateTime", "BatteryLevel"],
      limit: 30,
    });
    res.json(data);
  } catch (error) {
    console.error("Error fetching DateTime and BatteryLevel data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/batteryData/DateTimeTemperature", async (req: Request, res: Response) => {
  try {
    const data = await BatteryData.findAll({
      attributes: ["DateTime", "Temperature"],
      limit: 100,
    });
    res.json(data);
  } catch (error) {
    console.error("Error fetching DateTime and Temperature data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use(express.static(path.join(__dirname, "../../my-doe-frontend/build")));


app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../my-doe-frontend/build/index.html"));
});

// app.get("/", (req: Request, res: Response) => res.json("Connected to API"));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
