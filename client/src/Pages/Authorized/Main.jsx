import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImCheckmark, ImCross } from "react-icons/im";
import { MdQrCodeScanner } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../actions/authActions";
import { getUserData, getHdfDay } from "../../actions/userActions";
import { Appheader, Appmenu, Dashboard, Profile } from "../../Components/ui";
import { Alert, Button, Icon, List, ListItem } from "../../Components/commons";

function Main() {
  const navigate = useNavigate();

  // react hooks
  const { auth, setAuth } = useAuth();

  // initializations
  const [user, setUser] = useState({});
  const [hdf, setHdf] = useState({});

  // render states
  const [dribble, setDribble] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasHDF, setHasHDF] = useState(false);

  // render handlers
  const handleDribble = () => {
    setDribble(!dribble);
  };

  // use effects
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

  // handlers
  const logoutUser = async (e) => {
    e.preventDefault();
    const response = await logout();
    if (response) {
      setAuth({ access: null });
      navigate("/login", { replace: true });
      window.location.reload();
    }
  };

  // variables
  const { first_name, last_name, email_address } = user;
  const { allowed } = hdf;

  return (
    <div className="relative text-xs bg-slate-100 ... sm:text-base">
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

      <Appheader header="Dashboard" onMenuClick={handleDribble} />

      <Profile
        userFullName={`${first_name} ${last_name}`}
        userEmail={email_address}
        loading={isLoading}
      />

      <div className="py-10 px-5 space-y-5 rounded-t-3xl bg-white ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
        <div className={isLoading ? "blur-sm animate-pulse" : ""}>
          <Alert
            message="Fill out your Health Declaration Form first in order to scan the QR Code."
            info
          />
        </div>

        <div
          className={
            isLoading ? "blur-sm animate-pulse" : "flex flex-col space-y-16"
          }
        >
          <List position="vertical">
            <div className="text-lg">
              {allowed ? (
                <ListItem
                  className="select-none bg-blue-600"
                  icon={
                    <Icon
                      roundedFull
                      className="bg-blue-400 text-white"
                      icon={<ImCheckmark className="h-4 w-4" />}
                    />
                  }
                  label="ENTRY ALLOWED"
                  subtitle="Entry status"
                  textColor="white"
                />
              ) : (
                <ListItem
                  className="select-none  bg-red-600"
                  icon={
                    <Icon
                      roundedFull
                      className="bg-red-400 text-white"
                      icon={<ImCross className="h-4 w-4" />}
                    />
                  }
                  label="ENTRY NOT ALLOWED"
                  subtitle="Entry status"
                  textColor="white"
                />
              )}
            </div>

            <Dashboard
              loading={isLoading}
              onClickHDF={(e) => {
                e.preventDefault();
                navigate("/hdf");
              }}
              onClickVacc={(e) => {
                e.preventDefault();
                navigate("/vaccine");
              }}
            />
          </List>

          {hasHDF && (
            <div className="flex flex-col space-y-10">
              <div className="bottom-0 grid grid-cols-2 gap-x-3">
                {hdf.allowed ? (
                  <Button
                    className="bg-blue-600"
                    label="VIEW RESULT"
                    roundedFull
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/result");
                    }}
                    disabled={isLoading}
                  />
                ) : (
                  <Button
                    className="bg-red-600"
                    label="VIEW ENTRY LOGS"
                    roundedFull
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/result");
                    }}
                    disabled={isLoading}
                  />
                )}
                <Button
                  icon={<MdQrCodeScanner className="h-6 w-6" />}
                  label="SCAN QR CODE"
                  roundedFull
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/qr-scanner");
                  }}
                  disabled={isLoading || !allowed}
                />
              </div>

              <div className="px-2">
                <span>
                  After you scan a QR Code, there will be an interval of 1 hour
                  before you are able to scan again.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
