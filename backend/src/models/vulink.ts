import { DataTypes } from "sequelize";
import { sequelize } from "../database";


export type BatteryDataAttribute = {
    DateTime: Date;
    BatteryLevel: number;
    StationID: string;
    Baro: number | null;
    Temperature: number | null;
    Easting: number;
    Northing: number;
}
export const BatteryData = sequelize.define("BatteryData", {
  DateTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  BatteryLevel: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  StationID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Baro: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Temperature: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Easting: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Northing: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});
