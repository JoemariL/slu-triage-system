import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../actions/authActions";
import { getUserData, getHdfDay } from "../../actions/userActions";
import { Appbar, HamburgerMenu, Dashboard, Profile } from "../../Components/ui";

function Main() {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState({});
  const [hdf, setHdf] = useState({});
  const [hasHDF, setHasHDF] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [dribble, setDribble] = useState(false);

  const handleDribble = () => {
    setDribble(!dribble);
  };

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const user = await getUserData();
      if (user) {
        setUser(user);
        setIsLoading(false);
      }
    })();
  }, [auth]);

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
    }
  };

  const { first_name, last_name, email_address } = user;
  const { allowed } = hdf;

  return (
    <div className="relative text-sm ... sm:text-base">
      {dribble && (
        <HamburgerMenu
          onReturnClick={handleDribble}
          onLogOutClick={logoutUser}
        />
      )}

      <Appbar headerText="Dashboard" onMenuClick={handleDribble} />
      <Profile
        userFullName={`${first_name} ${last_name}`}
        userEmail={email_address}
        loading={isLoading}
      />

      <div className="my-10 mx-5 space-y-5 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <Dashboard hasHDF={hasHDF} status={allowed} loading={isLoading} />
      </div>
    </div>
  );
}

export default Main;
