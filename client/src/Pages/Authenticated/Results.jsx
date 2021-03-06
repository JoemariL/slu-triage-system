import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";
import { MdQrCodeScanner } from "react-icons/md";
import moment from "moment";

import useAuth from "../../hooks/useAuth";
import { getHdfDay, getUserData } from "../../actions/userActions";
import { logout } from "../../actions/authActions";

import { Background, MainLayout } from "../../Components/app_ui/Layouts";
import {
  DrawerMenu,
  ResultSummary,
} from "../../Components/app_ui/Authenticated";
import { Appbar } from "../../Components/app_ui";
import { Button } from "../../Components/commons";

function Results() {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState({});
  const [hdf, setHdf] = useState({});

  const [drawer, setDrawer] = useState(false);

  const renderDrawer = () => {
    setDrawer(!drawer);
  };

  const [allowed, setIsAllowed] = useState(false);
  const [hasHDF, setHasHDF] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const user = await getUserData();
      if (user) {
        setUser(user);
        setIsLoading(false);
      }
    })();
  }, []);

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
      window.location.reload();
    }
  };

  const { first_name, last_name, user_type } = user;
  const { entry_date } = hdf;

  return (
    <Background>
      {drawer && (
        <DrawerMenu
          RETURN={renderDrawer}
          DASHBOARD={(e) => {
            e.preventDefault();
            renderDrawer();
            navigate("/main");
          }}
          PROFILE_UDATE={(e) => {
            e.preventDefault();
            renderDrawer();
            navigate("/profile/update");
          }}
          LOGOUT={logoutUser}
          loading={isLoading}
        />
      )}

      <Appbar header="Result View" onMenuClick={renderDrawer} />

      <MainLayout>
        <div className="space-y-10">
          <div className="grid grid-cols-2">
            <div className="w-3/4 overflow-x-auto">
              <p className="text-lg font-bold whitespace-nowrap">
                {first_name} {last_name}
              </p>
              <p className="w-64 text-lg text-blue-800 truncate">{user_type}</p>
            </div>

            {allowed && (
              <Button
                className="bg-indigo-600 rounded-full text-white"
                icon={<MdQrCodeScanner className="h-6 w-6" />}
                label="SCAN QR CODE"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/qr-scanner");
                }}
                disabled={isLoading}
              />
            )}
          </div>

          <ResultSummary
            ENTRY_STATUS={allowed}
            DAY={moment(entry_date).format("dddd,")}
            MONTH_YEAR={moment(entry_date).format("MMMM Do YYYY")}
            ENTRY_DATE={entry_date}
            HDF={hdf[0]}
          />

          {allowed && (
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
          )}
        </div>
      </MainLayout>
    </Background>
  );
}

export default Results;
