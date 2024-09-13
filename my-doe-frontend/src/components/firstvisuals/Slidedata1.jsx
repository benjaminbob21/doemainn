import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import datavis from "../ui/datavis.jpeg";
import {useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";

const Slidedata1 = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center px-5 pb-5">
      <div className="relative w-[75%] bg-gray-200 border rounded-xl px-10 py-10">
        <div className="text-center font-bold p-5 text-2xl shadow">
          Water Data Quality Visualization
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
          <button
            onClick={() => navigate("/prev1")}
            className="bg-blue-600 rounded-full px-4 py-2 text-white font-bold hover:bg-blue-300"
          >
            Preview Data
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-3 font-bold gap-2">
              <span className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-300">
                Extended Data Visuals
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => navigate("/datetime-ph1")}
                className="bg-blue-600 hover:bg-blue-300 font-bold text-white"
              >
                DateTime vs pH
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem
                onClick={() => navigate("/datetime-phmv1")}
                className="bg-blue-600  hover:bg-blue-300 font-bold text-white"
              >
                Datetime vs pHMV
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem
                onClick={() => navigate("/pHmvTemperature-visualization1")}
                className="bg-blue-600  hover:bg-blue-300 font-bold text-white"
              >
                pHpHmvTemperature
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem
                onClick={() => navigate("/pHmv-visualization1")}
                className="bg-blue-600  hover:bg-blue-300 font-bold text-white"
              >
                pH vs pHMV
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem
                onClick={() => navigate("/pHTemperature-visualization1")}
                className="bg-blue-600  hover:bg-blue-300 font-bold text-white"
              >
                pH vs Temperature
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Slidedata1;
