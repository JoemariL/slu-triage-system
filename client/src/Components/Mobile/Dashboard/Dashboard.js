import { GiLoveInjection, GiFiles } from "react-icons/gi";

const Dashboard = () => {
  return (
    <div className="text-base">
      <div className="h-24 rounded-xl grid grid-cols-2 bg-white drop-shadow">
        <div className="flex flex-col justify-center items-center rounded-xl text-blue-800 focus:outline-none hover:text-blue-700 hover:bg-gray-100 cursor-pointer">
          <div>
            <button className="component-button-icon" type="button">
              <GiLoveInjection />
            </button>
          </div>

          <div className="text-sm text-center">
            <span>Vaccine Profile</span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center rounded-xl text-blue-800 focus:outline-none hover:text-blue-700 hover:bg-gray-100 cursor-pointer">
          <div>
            <button className="component-button-icon" type="button">
              <GiFiles />
            </button>
          </div>

          <div className="text-sm text-center">
            <span>View HDF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
