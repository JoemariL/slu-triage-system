import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ArchivedReportsTable } from "../Modules/Displays";

import { Background, DualLayout } from "../Components/app_ui/Layout";
import { DateTab } from "../Components/app_ui/Misc";
import { Button, Input } from "../Components/common";

import { getReports } from "../actions/commonActions";
import moment from "moment";

function ReportsArchived() {
  const navigate = useNavigate();

  const [archives, setArchives] = useState({});
  const [selectedArchive, setSelectedArchive] = useState({});
  const [date, setDate] = useState("");
  const [selected, setSelected] = useState(false);

  const [render, setRender] = useState(false);

  useEffect(() => {
    (async function () {
      const response = await getReports();
      if (response.hasOwnProperty("message")) {
        alert("Error Occured.");
      } else {
        setArchives(response);
      }
    })();
  }, []);

  return (
    <Background>
      <div className="bg-slate-100 sticky top-0 w-full p-4 z-40 ... inline-flex items-center gap-5 shadow-sm">
        <Button
          className="bg-gray-600 text-white px-6 ... rounded-l-full"
          label="Return to Reports"
          type="button"
          onClick={() => {
            navigate("/reports", { replace: true });
          }}
        />
      </div>

      <DualLayout>
        <div className="w-full border-2 lg:w-[28rem]">
          <div className="w-full p-2 ... inline-flex justify-between items-center shadow-sm">
            <span className="text-blue-600 text-lg font-bold">
              ARCHIVED DATES
            </span>
          </div>

          <div className="h-[80%] px-2 pt-4 pb-48 overflow-y-auto ...">
            {archives.length ? (
              archives.map((payload) => {
                const convertedDate = moment(payload.date).format("LL");
                return (
                  <DateTab
                    key={payload._id}
                    DATE={convertedDate}
                    onClick={() => {
                      setRender(false);
                      setSelectedArchive(payload);
                      setDate(convertedDate);
                      setSelected(true);
                      setTimeout(() => {
                        setRender(true);
                      }, 10);
                    }}
                    ACTIVE={date === convertedDate}
                  />
                );
              })
            ) : (
              <span className="font-bold">NO DATA.</span>
            )}
          </div>
        </div>

        <div className="h-full w-full overflow-y-auto">
          {render ? (
            <>
              <div className="bg-slate-50 sticky top-0 w-full p-4 z-40 ... inline-flex items-center gap-3 shadow-sm">
                <span className="px-4 text-lg"> {date} </span>
              </div>
              <div className="container mx-auto">
                <div className="px-6 pt-4 pb-48 space-y-10">
                  {selected && <ArchivedReportsTable DATA={selectedArchive} />}
                </div>
              </div>
            </>
          ) : (
            <> </>
          )}
        </div>
      </DualLayout>
    </Background>
  );
}

export default ReportsArchived;
