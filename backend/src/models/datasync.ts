import { WaterQualityData } from "./at200";
import { WaterQualityDataSecond } from "./at500";
import { BatteryData } from "./vulink";
import User from "./user";

WaterQualityData.sync();
WaterQualityDataSecond.sync();
BatteryData.sync();
User.sync();

export { WaterQualityData, WaterQualityDataSecond, BatteryData };
