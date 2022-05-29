import React from "react";

import { TriageUsersTable } from "../Modules/Displays";

import { Background } from "../Components/app_ui/Layout";

function TriageUsers() {
  return (
    <Background className="overflow-y-auto">
      <div className="bg-slate-100 sticky top-0 w-full p-4 z-40 ... inline-flex items-center gap-3 shadow-sm">
        <span className="text-blue-900 text-lg font-bold">
          TRIAGE APP USERS MANAGEMENT
        </span>
      </div>

      <div className="mx-4 pt-16 pb-48 lg:w-[81rem]">
        <TriageUsersTable />
      </div>
    </Background>
  );
}

export default TriageUsers;
