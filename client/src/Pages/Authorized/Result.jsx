import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../actions/authActions";
import { getHdfDay } from "../../actions/userActions";
import { Appbar, HamburgerMenu, ResultView } from "../../Components/ui";

function Result() {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();

  const [dribble, setDribble] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hdf, setHdf] = useState({});
  const [hasHDF, setHasHDF] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const user = await getHdfDay();
      if (!user || user.length === 0) {
        setHdf({});
      } else {
        const hdfCampusInfo = user.map((payload) => {
          return {
            id: payload._id,
            entry_campus: payload.entry_campus,
            gate_info: payload.gate_info,
            entry_date: payload.entry_date,
            destination: payload.destination
          }
        })

        setHdf(hdfCampusInfo)
        setHasHDF(true);
        setIsLoading(false);
      }
    })();
  }, []);

  const handleDribble = () => {
    setDribble(!dribble);
  };

  const logoutUser = async (e) => {
    e.preventDefault();
    const response = await logout();
    if (response) {
      setAuth({ access: null });
      navigate("/login", { replace: true });
    }
  };

  const { allowed } = hdf;

  return (
    <div className="relative text-xs ... sm:text-base">
      {dribble && (
        <HamburgerMenu
          onReturnClick={handleDribble}
          onHomeClick={(e) => {
            e.preventDefault();
            navigate("/main");
          }}
          onLogOutClick={logoutUser}
        />
      )}

      <Appbar headerText="Result" onMenuClick={handleDribble} />

      <div className="py-10 mx-5 space-y-5 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <ResultView entryStatus={allowed} loading={isLoading} />

        <div className="relative overflow-x-auto shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Campus Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Gate
                </th>
                <th scope="col" className="px-6 py-3">
                  Destination
                </th>
                <th scope="col" className="px-6 py-3">
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody>
              {
                hdf.length && hdf.map(payload => 
                  <tr key={payload.id}>
                    <th scope="row"className="px-6 py-4 font-medium whitespace-nowrap">
                      { payload.entry_campus }
                    </th>
                    <td className="px-6 py-4">{ payload.gate_info }</td>
                    <td className="px-6 py-4">{ payload.destination }</td>

                    <td className="px-6 py-4">{ payload.entry_date }</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Result;
