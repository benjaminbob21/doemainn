"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterQualityData = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
exports.WaterQualityData = database_1.sequelize.define("WaterQualityData", {
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
    pH: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    pHMV: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    SaturationOxygen: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    PartialPressureOxygen: {
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
    Temperature: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
});
