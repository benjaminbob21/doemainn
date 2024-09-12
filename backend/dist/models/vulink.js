"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatteryData = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
exports.BatteryData = database_1.sequelize.define("BatteryData", {
    DateTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    BatteryLevel: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    StationID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Baro: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    Temperature: {
        type: sequelize_1.DataTypes.FLOAT,
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
