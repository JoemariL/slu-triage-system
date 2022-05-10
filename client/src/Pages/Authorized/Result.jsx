import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { BiLoaderAlt } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../actions/authActions";
import { getHdfDay } from "../../actions/userActions";
import { Appheader, Appmenu, ResultView } from "../../Components/ui";

function Result() {
  const navigate = useNavigate();

  // react hooks
  const { auth, setAuth } = useAuth();

  // initializations
  const [hdf, setHdf] = useState({});

  // render states
  const [dribble, setDribble] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allowed, setIsAllowed] = useState(false);
  const [hasHDF, setHasHDF] = useState(false);

  // render handlers
  const handleDribble = () => {
    setDribble(!dribble);
  };

  // use effects
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const user = await getHdfDay();
      if (!user || user.length === 0) {
        setHdf({});
      } else {
        const hdfCampusInfo = user.map((payload) => {
          setIsAllowed(payload.allowed);
          return {
            id: payload._id,
            entry_campus: payload.entry_campus,
            gate_info: payload.gate_info,
            entry_date: payload.entry_date,
            destination: payload.destination,
          };
        });

        setHdf(hdfCampusInfo);
        setHasHDF(true);
        setIsLoading(false);
      }
    })();
  }, []);

  const logoutUser = async (e) => {
    e.preventDefault();
    const response = await logout();
    if (response) {
      setAuth({ access: null });
      navigate("/login", { replace: true });
    }
  };

  const { entry_date } = hdf;

  return (
    <div className="relative text-xs ... sm:text-base">
      {dribble && (
        <Appmenu
          onReturnClick={handleDribble}
          onHomeClick={(e) => {
            e.preventDefault();
            handleDribble();
            navigate("/main");
          }}
          onEditClick={(e) => {
            e.preventDefault();
            handleDribble();
            navigate("/profile/update");
          }}
          onLogOutClick={logoutUser}
          loading={isLoading}
        />
      )}

      <Appheader header="Your Result" onMenuClick={handleDribble} />

      <div className="py-10 px-5 space-y-5 bg-white ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
        {isLoading ? (
          <div className="w-full flex flex-col items-center">
            <BiLoaderAlt className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
        ) : (
          <>
            <ResultView
              entryStatus={allowed}
              loading={isLoading}
              dateD={moment(entry_date).format("dddd,")}
              dateMY={moment(entry_date).format("MMMM Do YYYY")}
            />

            <div className="relative overflow-x-auto shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-100">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Campus & Gate
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Destination
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hdf.length &&
                    hdf.map((payload) => (
                      <tr key={payload.id}>
                        <td className="px-6 py-4">
                          {payload.entry_date
                            ? moment(payload.entry_date).format("h:mm:ss a")
                            : ""}
                        </td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                          <div className="flex flex-col">
                            <span className="font-bold truncate">
                              {payload.entry_campus}
                            </span>
                            <span className="truncate">
                              {payload.gate_info}
                            </span>
                          </div>
                        </th>
                        <td className="px-6 py-4 truncate">
                          {payload.destination}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Result;
