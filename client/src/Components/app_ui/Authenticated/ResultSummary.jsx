import { ImCheckmark, ImCross } from "react-icons/im";
import classNames from "classnames";

import { Button, Icon, List, ListItem } from "../../commons";
import { Approved, Disapproved } from "../../../Assets";

const ResultSummary = ({
  ENTRY_STATUS = false,
  DAY = "",
  MONTH_YEAR = "",
  ENTRY_DATE = "",
  HDF = {}
}) => {
  return (
    <div className="flex flex-col space-y-10">
      <List position="vertical">
        <div className="text-lg">
          {ENTRY_STATUS && (
            <ListItem
              className={classNames(
                HDF.entry_date
                  ? "w-full rounded-t select-none bg-blue-600 text-white"
                  : "w-full rounded-t select-none bg-yellow-600 text-white"
              )}
              icon={
                ENTRY_DATE && (
                  <Icon
                    roundedFull
                    className="bg-blue-400 text-white"
                    icon={<ImCheckmark className="h-4 w-4" />}
                  />
                )
              }
              label="ENTRY ALLOWED"
              subtitle="Entry status"
            />
          )}

          {!ENTRY_STATUS && (
            <ListItem
              className="w-full rounded-t-xl select-none bg-red-600 text-white"
              icon={
                <Icon
                  roundedFull
                  className="bg-red-400 text-white"
                  icon={<ImCross className="h-4 w-4" />}
                />
              }
              label="ENTRY NOT ALLOWED"
              subtitle="Entry status"
            />
          )}
        </div>

        <div className="p-5 flex flex-row gap-x-10 items-center bg-slate-100">
          <img
            className="h-auto w-24 rounded-full"
            src={ENTRY_STATUS ? Approved : Disapproved}
            alt="slu triage application result"
          />

          <div className="flex flex-col space-y-5">
            {ENTRY_STATUS ? (
              <>
                <p>YOU ARE ALLOWED TO ENTER THE CAMPUS.</p>
                <div
                  className={classNames(
                    HDF.entry_date
                      ? "w-fit p-3 flex flex-col bg-blue-600 text-white rounded md:flex-row md:space-x-1"
                      : "w-fit p-3 flex flex-col bg-yellow-600 text-white rounded md:flex-row md:space-x-1"
                  )}
                >
                  <p className="text-xl font-bold">{DAY}</p>
                  <p className="text-xl font-bold">{MONTH_YEAR}</p>
                </div>
              </>
            ) : (
              <>
                <p>YOU ARE NOT ALLOWED TO ENTER THE CAMPUS.</p>
                <div className="w-fit p-3 flex flex-col bg-red-600 text-white rounded md:flex-row md:space-x-1">
                  <p className="text-xl font-bold">{DAY}</p>
                  <p className="text-xl font-bold">{MONTH_YEAR}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <hr />

        <div className="p-5 flex flex-col space-y-3 bg-slate-50">
          {ENTRY_STATUS ? (
            <>
              <div>
                <article className="text-justify">
                  <p>
                    <span>
                      <strong>NOTE</strong>
                    </span>
                  </p>

                  <p>
                    Strictly observe minimum public health standards and Saint
                    Louis University's health and safety protocols.
                  </p>
                </article>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col space-y-10">
                <article className="text-justify">
                  <p>
                    <span>
                      <strong>NOTE</strong>
                    </span>
                  </p>

                  <p>
                    Please go and stay home; then consult online at: &nbsp;
                    <span className="font-bold underline underline-offset-2 decoration-blue-800">
                      slu.medical.clinic@slu.edu.ph.
                    </span>
                  </p>

                  <br />

                  <p>Observe minimum public health standards.</p>
                </article>
              </div>
            </>
          )}
        </div>
      </List>
    </div>
  );
};

export default ResultSummary;
