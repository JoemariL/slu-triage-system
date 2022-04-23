import classnames from "classnames";
import { ImCheckmark, ImCross } from "react-icons/im";
import { Icon, List, ListItem } from "../../commons";
import { Approved, Disapproved } from "../../../assets";

const ResultView = ({ entryStatus = false, loading = false }) => {
  return (
    <div
      className={classnames(
        "flex flex-col space-y-10"
        // loading ? "blur-sm animate-pulse" : ""
      )}
    >
      <List position="vertical">
        <div className="text-lg">
          <ListItem
            className={
              entryStatus
                ? "select-none bg-blue-600"
                : "select-none  bg-red-600"
            }
            icon={
              <Icon
                background="rounded-full"
                className={
                  entryStatus
                    ? "bg-blue-400 text-white"
                    : "bg-red-400 text-white"
                }
                icon={
                  entryStatus ? (
                    <ImCheckmark className="h-4 w-4" />
                  ) : (
                    <ImCross className="h-4 w-4" />
                  )
                }
              />
            }
            label={entryStatus ? "ENTRY ALLOWED" : "ENTRY NOT ALLOWED"}
            subtitle="Entry  status"
            textColor="white"
          />
        </div>

        <div className="p-5 flex flex-col  space-y-3 justify-center items-center bg-slate-100">
          <img
            className={classnames(
              "h-auto w-24 rounded-full"
              // loading ? "blur-sm animate-pulse" : ""
            )}
            src={entryStatus ? Approved : Disapproved}
            alt="slu triage application result"
          />
          <span className="font-bold">
            {entryStatus
              ? "ALLOWED TO ENTER THE CAMPUS!"
              : "NOT ALLOWED TO ENTER THE CAMPUS!"}
          </span>
        </div>

        <div className="p-5 flex flex-col  space-y-3 justify-center items-center bg-slate-50">
          {entryStatus ? (
            <>
              <div>
                <article>
                  <span>
                    <strong>NOTE</strong>
                  </span>

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
                <article>
                  <span>
                    <strong>NOTE FOR STUDENTS & EMPLOYEES</strong>
                  </span>

                  <p>
                    Please go and stay home; then consult online at &nbsp;
                    <span className="underline underline-offset-2 decoration-blue-800">
                      <strong>slu.medical.clinic@slu.edu.ph.</strong>
                    </span>
                    <br /> Observe minimum public health standards.
                  </p>
                </article>
              </div>
            </>
          )}
        </div>
      </List>
    </div>
  );
};

export default ResultView;
