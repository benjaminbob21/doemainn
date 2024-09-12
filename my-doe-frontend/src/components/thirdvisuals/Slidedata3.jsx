import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import datavis from "../ui/datavis.jpeg";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

const Slidedata3 = () => {
  return (
    <div className="flex flex-col items-center px-5 pb-5">
      <div className="relative w-[75%] bg-gray-200 border rounded-xl px-10 py-10">
        <div className="text-center font-bold p-5 text-2xl shadow">
          Battery Data Quality Visualization
        </div>
        <div className="flex justify-between gap-8 items-center pb-10">
          <img
            src={datavis}
            alt="data display"
            className="rounded-full w-[50%]"
          ></img>
          <span className="font-mono font-semibold text-gray-600">
            Visualize and Compare Different Water Quality Data...{" "}
          </span>
        </div>
        <div className="flex justify-center gap-10">
          <button className="bg-blue-600 rounded-full px-4 py-2 hover:bg-blue-300">
            <Link to="prev3" className="text-white font-bold">
              Preview Data
            </Link>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-3 font-bold gap-2">
              <span className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-300">
                Extended Data Visuals
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="bg-blue-600  hover:bg-blue-300">
                <Link to="/datetime-ph1" className="font-bold">
                  DateTime vs pH
                </Link>
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem className="bg-blue-600  hover:bg-blue-300">
                <Link to="/datetime-phmv1" className="font-bold">
                  Datetime vs pHMV
                </Link>
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem className="bg-blue-600  hover:bg-blue-300">
                <Link
                  to="/pHmvTemperature-visualization1"
                  className="font-bold"
                >
                  pHpHmvTemperature
                </Link>
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem className="bg-blue-600  hover:bg-blue-300">
                <Link to="/pHmv-visualization1" className="font-bold">
                  pH vs pHMV
                </Link>
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem className="bg-blue-600  hover:bg-blue-300">
                <Link to="/pHTemperature-visualization1" className="font-bold">
                  pH vs Temperature
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Slidedata3;
