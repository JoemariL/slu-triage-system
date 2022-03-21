import { GiLoveInjection } from "react-icons/gi";
import { AiOutlineForm } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className="text-base">
      <div className="h-24 grid grid-cols-2 bg-white drop-shadow">
        <div className="flex flex-col justify-center items-center text-blue-800 focus:outline-none hover:text-blue-700 hover:bg-gray-100 cursor-pointer">
          <div>
            <button
              className="h-auto w-9 flex flex-col justify-center items-center rounded text-3xl text-center bg-none"
              type="button"
            >
              <GiLoveInjection />
            </button>
          </div>

          <div className="text-sm text-center">
            <p>
              <span>Vaccine Profile</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center text-blue-800 focus:outline-none hover:text-blue-700 hover:bg-gray-100 cursor-pointer">
          <div>
            <button
              className="h-auto w-9 flex flex-col justify-center items-center rounded text-3xl text-center bg-none"
              type="button"
            >
              <AiOutlineForm />
            </button>
          </div>

          <div className="text-sm text-center">
            <p>
              <span>View HDF</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
