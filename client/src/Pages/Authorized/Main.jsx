import React from "react";
import { Appbar, Dashboard, Profile } from "../../Components/ui";

function Main() {
  return (
    <div className="text-sm bg-gradient-to-b from-slate-50 ... sm:text-base">
      <Appbar headerText="Dashboard" />
      <div className="mx-5 pt-20 space-y-10 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-72">
        <Profile />
        <Dashboard />
      </div>
    </div>
  );
}

export default Main;
