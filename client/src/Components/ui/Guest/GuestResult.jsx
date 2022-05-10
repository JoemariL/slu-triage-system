import classnames from "classnames";
import { ImCheckmark, ImCross } from "react-icons/im";
import { Icon, List, ListItem } from "../../commons";
import { Approved, Disapproved } from "../../../assets";

const GuestResult = ({
  entryStatus = false,
  date = "",
  dateD = "",
  dateMY = "",
}) => {
  return (
    <div className={classnames("flex flex-col space-y-10")}>
      <List position="vertical">
        <div className="text-lg">
          {entryStatus ? (
            <ListItem
              className="select-none bg-blue-600"
              icon={
                <Icon
                  roundedFull
                  className="bg-blue-400 text-white"
                  icon={<ImCheckmark className="h-4 w-4" />}
                />
              }
              label="ENTRY ALLOWED"
              subtitle="Entry status"
              textColor="white"
            />
          ) : (
            <ListItem
              className="select-none  bg-red-600"
              icon={
                <Icon
                  roundedFull
                  className="bg-red-400 text-white"
                  icon={<ImCross className="h-4 w-4" />}
                />
              }
              label="ENTRY NOT ALLOWED"
              subtitle="Entry status"
              textColor="white"
            />
          )}
        </div>

        <div className="p-5 flex flex-row gap-x-10 items-center bg-slate-100">
          <img
            className="h-auto w-24 rounded-full"
            src={entryStatus ? Approved : Disapproved}
            alt="slu triage application result"
          />

          <div className="flex flex-col space-y-5">
            {entryStatus ? (
              <>
                <p>YOU ARE ALLOWED TO ENTER THE CAMPUS.</p>
                <div className="w-fit p-3 flex flex-col bg-blue-600 text-white rounded md:flex-row md:space-x-1">
                  <p className="text-xl font-bold">{dateD}</p>
                  <p className="text-xl font-bold">{dateMY}</p>
                </div>
              </>
            ) : (
              <>
                <p>YOU ARE NOT ALLOWED TO ENTER THE CAMPUS.</p>
                <div className="w-fit p-3 flex flex-col bg-red-600 text-white rounded md:flex-row md:space-x-1">
                  <p className="text-xl font-bold">{dateD}</p>
                  <p className="text-xl font-bold">{dateMY}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="p-5 flex flex-col space-y-3 bg-slate-50">
          {entryStatus ? (
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
                      <strong>NOTE FOR VISITORS</strong>
                    </span>
                  </p>

                  <p>
                    Strictly observe minimum public health standards and Saint
                    Louis University's health and safety protocols.
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

export default GuestResult;
