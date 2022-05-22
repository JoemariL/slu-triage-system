import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import useAuth from "../../hooks/useAuth";
import { getUserData } from "../../actions/userActions";
import { logout } from "../../actions/authActions";

import { Background, MainLayout } from "../../Components/app_ui/Layouts";
import { DrawerMenu } from "../../Components/app_ui/Authenticated";
import { Appbar } from "../../Components/app_ui";
import { Alert, List, ListItem, Button } from "../../Components/commons";

function VaccineProfile() {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();

  const [vaccine, setVaccine] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [hasVaccine, setHasVaccine] = useState(false);

  const [drawer, setDrawer] = useState(false);

  const renderDrawer = () => {
    setDrawer(!drawer);
  };

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const user = await getUserData();
      if (!user?.vaccination_details[0]) {
        setVaccine({});
        setIsLoading(false);
      } else {
        setVaccine(user.vaccination_details[0]);
        setHasVaccine(true);
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

  const { vaccine_status, vaccine_date, vaccine_serial_no } = vaccine;

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

      <Appbar header="Vaccine Profile" onMenuClick={renderDrawer} />

      <MainLayout>
        <div className="space-y-10">
          {!hasVaccine && (
            <Alert message="Please set up your vaccine profile." warning />
          )}

          <div className="flex flex-col space-y-10">
            <List position="vertical">
              <ListItem
                label={hasVaccine ? vaccine_status : "NO DATA"}
                subtitle="Vaccine status"
              />
              <ListItem
                label={
                  hasVaccine
                    ? moment(vaccine_date).format("MMMM Do YYYY")
                    : "NO DATA"
                }
                subtitle={
                  vaccine_status === "NOT VACCINATED"
                    ? "No date of dose."
                    : "Date of last dose"
                }
              />
              <ListItem
                label={hasVaccine ? vaccine_serial_no : "NO DATA"}
                subtitle={
                  vaccine_status === "NOT VACCINATED"
                    ? "No vaccination card serial no."
                    : "Vaccination card serial no."
                }
              />
            </List>

            <div className="w-full inline-flex justify-center items-center">
              <Button
                className="bg-blue-900 text-white px-14 rounded-full"
                label="Manage Vaccine Profile"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/vaccine/manage");
                }}
              />
            </div>
          </div>
          <hr />
        </div>
      </MainLayout>
    </Background>
  );
}

export default VaccineProfile;
