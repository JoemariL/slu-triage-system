import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { ImCheckmark, ImCross } from "react-icons/im";
import { MdQrCodeScanner, MdPending } from "react-icons/md";

import useAuth from "../../hooks/useAuth";

import { logout } from "../../actions/authActions";
import { getUserData, getHdfDay } from "../../actions/userActions";

import { Background, MainLayout } from "../../Components/app_ui/Layouts";
import {
  DashboardMenu,
  DrawerMenu,
} from "../../Components/app_ui/Authenticated";
import { Appbar } from "../../Components/app_ui";
import { Alert, Button, Icon } from "../../Components/commons";

function Main() {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState({});
  const [hdf, setHdf] = useState({});

  const [drawer, setDrawer] = useState(false);

  const renderDrawer = () => {
    setDrawer(!drawer);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [hasHDF, setHasHDF] = useState(false);

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
        setHdf(user[0]);
        setHasHDF(true);
        setIsLoading(false);
      }
    })();
  }, [auth]);

  const logoutUser = async (e) => {
    e.preventDefault();
    const response = await logout();
    if (response) {
      setAuth({ access: null });
      navigate("/login", { replace: true });
      window.location.reload();
    }
  };

  const { first_name, last_name, email_address } = user;
  const { allowed, entry_date } = hdf;

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

      <Appbar header="User Dashboard" onMenuClick={renderDrawer} />
      <MainLayout className="space-y-5">
        {/* NOTE: USER Profile Display. */}
        <div className="w-full p-4 ... inline-flex items-center">
          <div className="w-3/4 overflow-x-auto">
            <p className="text-gray-600">WELCOME</p>
            <p className="text-lg font-bold whitespace-nowrap">
              {first_name} {last_name}
            </p>
            <p className="w-64 text-lg text-blue-800 truncate">
              {email_address}
            </p>
          </div>

          <div className="ml-auto">
            {!hasHDF && (
              <Icon
                roundedFull
                className="bg-gray-400 text-white"
                icon={<BsFillQuestionCircleFill className="h-4 w-4" />}
              />
            )}

            {entry_date ? (
              <>
                {hasHDF && (
                  <>
                    {allowed && (
                      <Icon
                        roundedFull
                        className="bg-blue-600 text-white"
                        icon={<ImCheckmark className="h-4 w-4" />}
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {hasHDF && (
                  <>
                    {allowed && (
                      <Icon
                        roundedFull
                        className="bg-yellow-600 text-white"
                        icon={<MdPending className="h-4 w-4" />}
                      />
                    )}
                  </>
                )}
              </>
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

        {!hasHDF && (
          <Alert
            message="You are required to fill out your Health Declaration Form first before you can scan the QR Code."
            info
          />
        )}

        <hr />

        <div className="py-4">
          <DashboardMenu
            ON_CLICK_HDF={(e) => {
              e.preventDefault();
              navigate("/hdf");
            }}
            ON_CLICK_VACCINE={(e) => {
              e.preventDefault();
              navigate("/vaccine");
            }}
          />
        </div>

        {hasHDF && (
          <div className="flex flex-col space-y-10">
            <div className="bottom-0 grid grid-cols-2 gap-x-3">
              {entry_date ? (
                <>
                  {allowed && (
                    <Button
                      className="rounded-full bg-blue-600 text-white"
                      label="VIEW RESULT"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/hdf/result");
                      }}
                      disabled={isLoading}
                    />
                  )}
                </>
              ) : (
                <>
                  {allowed && (
                    <Button
                      className="rounded-full bg-yellow-600 text-white"
                      label="VIEW RESULT"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/hdf/result");
                      }}
                      disabled={isLoading}
                    />
                  )}
                </>
              )}

              {!allowed && (
                <Button
                  className="rounded-full bg-red-600 text-white"
                  label="VIEW RESULT"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/hdf/result");
                  }}
                  disabled={isLoading}
                />
              )}

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

            {allowed && (
              <div className="px-2">
                <span>
                  After you scan a QR Code, there will be an interval of 1 hour
                  before you are able to scan again.
                </span>
              </div>
            )}
          </div>
        )}
      </MainLayout>
    </Background>
  );
}

export default Main;
