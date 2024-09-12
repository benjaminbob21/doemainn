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
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = require("../database");
const datasync_1 = require("../models/datasync");
// import UserRoutes from './routes/users';
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
const MyUserController_1 = __importDefault(require("../controllers/MyUserController"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use((0, morgan_1.default)("dev"));
const SequelizeStore = (0, connect_session_sequelize_1.default)(express_session_1.default.Store);
const sessionStore = new SequelizeStore({
    db: database_1.sequelize,
});
// Session middleware
app.use((0, express_session_1.default)({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        sameSite: "lax",
        secure: true,
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year in milliseconds
    },
}));
sessionStore.sync();
// app.use(UserRoutes);
app.get("/__vite_ping", (req, res) => {
    res.status(200).json({ message: "Vite server is running" });
});
// Route to get all water data
app.get("/waterqualityData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const waterqualityData = yield datasync_1.WaterQualityData.findAll({
            limit: 30,
        });
        res.json(waterqualityData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Route to get all users
app.get("/batteryData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batteryData = yield datasync_1.BatteryData.findAll();
        res.json(batteryData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Route to get all categories
app.get("/waterqualitydataSecond", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query the database for a single page of data
        const data = yield datasync_1.WaterQualityDataSecond.findAll({
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
app.post("/register", validation_1.validateMyUserRequest, MyUserController_1.default.createUser);
app.post("/login", validation_1.loginCorrect, MyUserController_1.default.userLogin);
app.get("/validate-token", auth_1.verifyToken, (req, res) => {
    res.status(200).send({ userId: req.userId });
});
app.post("/logout", auth_1.verifyLogout);
exports.default = app;
