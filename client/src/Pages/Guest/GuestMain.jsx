import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImCheckmark, ImCross } from "react-icons/im";
import { MdQrCodeScanner } from "react-icons/md";
import moment from "moment";

import { getVisitor } from "../../actions/visitorActions";

import { Background, MainLayout } from "../../Components/app_ui/Layouts";
import {
  VisitorDrawerMenu,
  VisitorResultSummary,
} from "../../Components/app_ui/Guest";
import { Appbar } from "../../Components/app_ui";
import { Alert, Button, Icon } from "../../Components/commons";

function GuestMain() {
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(false);
  const [visitor, setVisitor] = useState({});
  const [hdf, setHdf] = useState({});

  const [drawer, setDrawer] = useState(false);

  const renderDrawer = () => {
    setDrawer(!drawer);
  };

  useEffect(() => {
    (async function () {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const userHdf = JSON.parse(localStorage.getItem("userHDF"));
      if (userInfo) {
        setVisitor(userInfo);
        setHdf(userHdf);
      } else {
        const user = await getVisitor();
        setVisitor(user);
        setHdf(user.hdf_data[0]);
        setIsValid(true);
      }
    })();
  }, []);

  const { first_name, last_name, contact_number } = visitor;
  const { allowed, entry_date } = hdf;

  return (
    <Background>
      {drawer && (
        <VisitorDrawerMenu
          RETURN={renderDrawer}
          RESET={(e) => {
            e.preventDefault();
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userVaccine");
            localStorage.removeItem("userHDF");
            navigate("/", { replace: true });
          }}
          LOGOUT={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          disabled={entry_date}
        />
      )}

      <Appbar header="Visitor Dashboard" onMenuClick={renderDrawer} />

      <MainLayout className="space-y-5">
        {/* NOTE: USER Profile Display. */}
        <div className="w-full p-4 ... inline-flex items-center">
          <div className="w-3/4 overflow-x-auto">
            <p className="text-gray-600">WELCOME</p>
            <p className="text-lg font-bold whitespace-nowrap">
              {first_name} {last_name}
            </p>
            <p className="w-64 text-lg text-blue-800 truncate">
              {contact_number}
            </p>
          </div>

          <div className="ml-auto">
            {allowed && (
              <Icon
                roundedFull
                className="bg-blue-600 text-white"
                icon={<ImCheckmark className="h-4 w-4" />}
              />
            )}

            {!allowed && (
              <Icon
                roundedFull
                className="bg-red-600 text-white"
                icon={<ImCross className="h-4 w-4" />}
              />
            )}
          </div>
        </div>

        <Alert
          message="Please take note that you are still required to bring your own Vaccination Card for verification."
          info
        />

        <hr />

        <div className="py-4">
          <VisitorResultSummary
            ENTRY_STATUS={allowed}
            DAY={moment(entry_date).format("dddd,")}
            MONTH_YEAR={moment(entry_date).format("MMMM Do YYYY")}
          />
        </div>

        <div className="flex flex-col space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div></div>

            {allowed && (
              <Button
                className="bg-indigo-600 rounded-full text-white"
                icon={<MdQrCodeScanner className="h-6 w-6" />}
                label="SCAN QR CODE"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/visitor/qr-scanner");
                }}
                disabled={entry_date}
              />
            )}
          </div>

          <div className="px-2">
            <p className="text-sm text-red-600">
              <span className="font-bold">
                * You can only scan the gate QR code once.
              </span>
            </p>
          </div>
        </div>
      </MainLayout>
    </Background>
  );
}

export default GuestMain;
