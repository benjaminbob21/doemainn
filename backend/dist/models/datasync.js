"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatteryData = exports.WaterQualityDataSecond = exports.WaterQualityData = void 0;
const at200_1 = require("./at200");
Object.defineProperty(exports, "WaterQualityData", { enumerable: true, get: function () { return at200_1.WaterQualityData; } });
const at500_1 = require("./at500");
Object.defineProperty(exports, "WaterQualityDataSecond", { enumerable: true, get: function () { return at500_1.WaterQualityDataSecond; } });
const vulink_1 = require("./vulink");
Object.defineProperty(exports, "BatteryData", { enumerable: true, get: function () { return vulink_1.BatteryData; } });
const user_1 = __importDefault(require("./user"));
at200_1.WaterQualityData.sync();
at500_1.WaterQualityDataSecond.sync();
vulink_1.BatteryData.sync();
user_1.default.sync();
