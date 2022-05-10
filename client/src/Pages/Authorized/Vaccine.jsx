import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import { getUserData } from "../../actions/userActions";
import { logout } from "../../actions/authActions";
import { Appheader, Appmenu, VaccineView } from "../../Components/ui";
import { Alert } from "../../Components/commons";

function Vaccine() {
  const navigate = useNavigate();
  // react hooks
  const { auth, setAuth } = useAuth();

  // initializations
  const [vaccine, setVaccine] = useState({});

  // render states
  const [dribble, setDribble] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasVaccine, setHasVaccine] = useState(false);

  // render handlers
  const handleDribble = () => {
    setDribble(!dribble);
  };

  // use effects
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
    }
  };

  const { vaccine_status, vaccine_date, vaccine_serial_no } = vaccine;

  return (
    <div className="relative text-sm ... sm:text-base">
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

      <Appheader header="Vaccination Profile" onMenuClick={handleDribble} />

      <div className="py-10 px-5 space-y-10 bg-white ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
        {!hasVaccine && (
          <div className={isLoading ? "blur-sm animate-pulse" : ""}>
            <Alert message="Please set up you Vaccination Profile." warning />
          </div>
        )}

        <VaccineView
          hasVaccine={hasVaccine}
          vaccineStatus={vaccine_status}
          vaccineDate={
            vaccine_date ? moment(vaccine_date).format("MMMM Do YYYY") : ""
          }
          vaccineSerial={vaccine_serial_no}
          loading={isLoading}
          onVaccineForm={(e) => {
            e.preventDefault();
            navigate("/vaccine/update");
          }}
        />
      </div>
    </div>
  );
}

export default Vaccine;
