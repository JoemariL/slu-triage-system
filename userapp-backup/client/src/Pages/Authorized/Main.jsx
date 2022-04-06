import React, { useState } from "react";
import { logout } from "../../actions/authActions";
import { Appbar, HamburgerMenu, Dashboard, Profile } from "../../Components/ui";

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [dribble, setDribble] = useState(false);

  const handleDribble = () => {
    setDribble(!dribble);
  };

  return (
    <div className="relative text-xs ... sm:text-base">
      {dribble && <HamburgerMenu onReturnClick={handleDribble} />}

      <Appbar headerText="Dashboard" onMenuClick={handleDribble} />
      <Profile />

      <div className="my-10 mx-5 space-y-5 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <Dashboard />
      </div>
    </div>
  );
}

export default Main;
