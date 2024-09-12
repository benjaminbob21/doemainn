import express, { Router, Request, Response } from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import { sequelize } from "../database";
import {
  WaterQualityData,
  WaterQualityDataSecond,
  BatteryData,
} from "../models/datasync";
// import UserRoutes from './routes/users';
import SequelizeStoreInit from "connect-session-sequelize";
// import fetchAndStoreProducts from './seed';
import { createProxyMiddleware } from "http-proxy-middleware";
import MyUserController from "../controllers/MyUserController";
import { verifyLogout, verifyToken } from "../middleware/auth";
import { validateMyUserRequest, loginCorrect } from "../middleware/validation";


const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use(morgan("dev"));

const SequelizeStore = SequelizeStoreInit(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize,
});

// Session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: "lax",
      secure: true,
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year in milliseconds
    },
  })
);
sessionStore.sync();

// app.use(UserRoutes);

app.get("/__vite_ping", (req: Request, res: Response) => {
  res.status(200).json({ message: "Vite server is running" });
});

// Route to get all water data
app.get("/waterqualityData", async (req: Request, res: Response) => {
  try {
    const waterqualityData = await WaterQualityData.findAll({
      limit: 30,
    });
    res.json(waterqualityData);
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all users
app.get("/batteryData", async (req: Request, res: Response) => {
  try {
    const batteryData = await BatteryData.findAll();
    res.json(batteryData);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all categories
app.get("/waterqualitydataSecond", async (req: Request, res: Response) => {
  try {
    // Query the database for a single page of data
    const data = await WaterQualityDataSecond.findAll({
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

app.post("/register", validateMyUserRequest, MyUserController.createUser);
app.post("/login", loginCorrect, MyUserController.userLogin);
app.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});
app.post("/logout", verifyLogout);

export default app;
