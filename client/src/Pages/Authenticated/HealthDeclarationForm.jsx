import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { logout } from "../../actions/authActions";
import { getHdfDay } from "../../actions/userActions";

import { Background, MainLayout } from "../../Components/app_ui/Layouts";
import { HDF, DrawerMenu } from "../../Components/app_ui/Authenticated";
import { Appbar } from "../../Components/app_ui";

function HealthDeclarationForm() {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
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
      window.location.reload();
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

      <Appbar header="Health Declaration Form" onMenuClick={renderDrawer} />

      <MainLayout>
        <HDF
          EXPOSURE={covid_exposure}
          POSITIVE={covid_positive}
          FEVER={fever}
          COUGH={cough}
          COLD={cold}
          SORE_THROAT={sore_throat}
          DIFF_BREATHING={diff_breathing}
          DIARRHEA={diarrhea}
          PREGNANT={pregnant}
          HAS_HDF={hasHDF}
          loading={isLoading}
          HDFFormOnClick={(e) => {
            e.preventDefault();
            navigate("/hdf/fillout");
          }}
        />
      </MainLayout>
    </Background>
  );
}

export default HealthDeclarationForm;
