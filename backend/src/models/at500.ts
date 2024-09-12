import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export type WaterQualityDataSecondAttribute = {
    DateTime: Date;
    Salinity: number;
    TotalDissolvedSolids: number;
    StationID: string;
    Easting: number;
    Northing: number;
};

export const WaterQualityDataSecond = sequelize.define(
  "WaterQualityDataSecond",
  {
    DateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Salinity: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    TotalDissolvedSolids: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    StationID: {
      type: DataTypes.STRING,
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
  }
);
