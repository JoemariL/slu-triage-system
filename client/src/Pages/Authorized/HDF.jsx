import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../actions/authActions";
import { getHdfDay } from "../../actions/userActions";
import { Appheader, Appmenu, HDFView } from "../../Components/ui";

function HDF() {
  const navigate = useNavigate();

  // react hooks
  const { auth, setAuth } = useAuth();

  // initializations
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
      const user = await getHdfDay();
      if (!user || user.length === 0) {
        setHdf({});
        setIsLoading(false);
      } else {
        const hdfStatus = user.map((payload) => {
          return {
            allowed: payload.allowed,
            covid_exposure: payload.covid_exposure,
            covid_positive: payload.covid_positive,
            fever: payload.fever,
            cough: payload.cough,
            cold: payload.cold,
            sore_throat: payload.sore_throat,
            diff_breathing: payload.diff_breathing,
            diarrhea: payload.diarrhea,
            pregnant: payload.pregnant,
            others: payload.others,
          };
        });

        setHdf({
          ...hdfStatus[0],
        });

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

  const {
    covid_exposure,
    covid_positive,
    fever,
    cough,
    cold,
    sore_throat,
    diff_breathing,
    diarrhea,
    pregnant,
  } = hdf;

  return (
    <div className="relative text-sm bg-slate-100 ... sm:text-base">
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

      <Appheader header="Health Declaration Form" onMenuClick={handleDribble} />

      <div className="py-10 px-5 space-y-5 bg-white ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
        <HDFView
          exposure={covid_exposure}
          positive={covid_positive}
          fever={fever}
          cough={cough}
          cold={cold}
          soreThroat={sore_throat}
          diffBreathing={diff_breathing}
          diarrhea={diarrhea}
          pregnant={pregnant}
          hasHDF={hasHDF}
          onHDForm={(e) => {
            e.preventDefault();
            navigate("/hdf/fillout");
          }}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default HDF;
