"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyLogout = exports.verifyToken = exports.jwtCheck = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const jwtCheck = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 86400000),
    });
};
exports.jwtCheck = jwtCheck;
const verifyToken = (req, res, next) => {
    const token = req.cookies["auth_token"];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};
exports.verifyToken = verifyToken;
const verifyLogout = (req, res) => {
    res.cookie("auth_token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    });
    res.send();
};
exports.verifyLogout = verifyLogout;
