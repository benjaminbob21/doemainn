"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterQualityDataSecond = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
exports.WaterQualityDataSecond = database_1.sequelize.define("WaterQualityDataSecond", {
    DateTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    Salinity: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    TotalDissolvedSolids: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    StationID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Easting: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    Northing: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
});
