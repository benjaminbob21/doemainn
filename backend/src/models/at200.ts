import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export type WaterQualityDataAttribute = {
  DateTime: Date | null;
  Salinity: number | null;
  TotalDissolvedSolids: number | null;
  pH: number | null;
  pHMV: number | null;
  SaturationOxygen: number | null;
  PartialPressureOxygen: number | null;
  StationID: string | null;
  Easting: number | null;
  Northing: number | null;
  Temperature: number | null;
};

export const WaterQualityData = sequelize.define("WaterQualityData", {
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
  pH: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  pHMV: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  SaturationOxygen: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  PartialPressureOxygen: {
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
  Temperature: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});
