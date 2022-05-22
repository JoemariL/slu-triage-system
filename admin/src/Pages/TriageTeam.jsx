import React from "react";

import { TriageAdminTable } from "../Modules/Displays";

import { Background } from "../Components/app_ui/Layout";

function TriageTeam() {
  return (
    <Background className="overflow-y-auto">
      <div className="bg-slate-100 sticky top-0 w-full p-4 z-40 ... inline-flex items-center gap-3 shadow-sm">
        <span className="text-blue-900 text-lg font-bold">
          TRIAGE TEAM ADMINISTRATOR MANAGEMENT
        </span>
      </div>

      <div className="w-[81rem] mx-auto pt-16 pb-48">
        <TriageAdminTable />
      </div>
    </Background>
  );
}

export default TriageTeam;
