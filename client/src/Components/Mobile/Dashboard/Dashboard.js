import { GiSyringe, GiHealthNormal } from "react-icons/gi";
import { IoAlertCircle } from "react-icons/io5";

const Dashboard = () => {
  return (
    <div className="text-base">
      <div className="h-24 rounded-xl grid grid-cols-2 bg-white drop-shadow">
        <div className="relative flex flex-col justify-center items-center rounded-xl cursor-pointer hover:bg-gray-100 ">
          <div>
            <button className="component-button-icon" type="button">
              <GiSyringe className="text-blue-800 focus:outline-none hover:text-blue-700" />
            </button>
          </div>

          <div className="text-sm text-center text-blue-800">
            <span>Vaccine Profile</span>
          </div>
        </div>

        <div className="relative flex flex-col justify-center items-center rounded-xl cursor-pointer hover:bg-gray-100">
          <div className="absolute p-2 top-0 right-0 self-end">
            <IoAlertCircle className="h-7 w-7 text-red-600" />
          </div>
          <div>
            <button className="component-button-icon" type="button">
              <GiHealthNormal className="text-blue-800 focus:outline-none hover:text-blue-700" />
            </button>
          </div>

          <div className="text-sm text-center text-blue-800">
            <span>HDF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
