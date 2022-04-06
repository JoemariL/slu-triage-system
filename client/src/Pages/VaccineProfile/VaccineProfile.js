import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineExclamation } from "react-icons/ai";
import { FaCheck, FaIdCard, FaQuestion, FaSyringe } from "react-icons/fa";
import UpdateVaccine from "./UpdateVaccine";
import { Appbar } from "../../Components";
import { Icon } from "../../Components/commons";
import { getUserData } from "../../actions/userActions";
import useAuth from "../../hooks/useAuth";

function VaccineProfile() {
  const navigate = useNavigate();

  //   Actions & hooks.
  const { auth } = useAuth();

  //   Vaccine profile variables.
  const [vaccine, setVaccine] = useState({});
  const [hasVaccine, setHasVaccine] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [vaccineForm, setVaccineForm] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true)
      const user = await getUserData();
      if (!user?.vaccination_details[0]) {
        setVaccine({});
        setIsLoading(false)
      } else {
        setHasVaccine(true);
        setVaccine(user.vaccination_details[0]);
        setIsLoading(false)
      }
    })();
  }, [auth, vaccineForm]);

  return (
    <div className="relative text-sm sm:text-base">
      {/* Vaccine form. */}
      {vaccineForm && (
        <UpdateVaccine
          user={vaccine}
          returnOnClick={() => setVaccineForm(false)}
          cancelOnClick={() => setVaccineForm(false)}
          nextPage={() => setVaccineForm(false)}
        />
      )}

      {/* Appbar. */}
      <div>
        <Appbar
          headerText="COVID-19 Vaccination Record"
          onClick={() => {
            navigate("/home");
          }}
        />
      </div>

      {/* Main. */}
      <div className="py-12 cursor-default">
        <div className="p-5 sm:px-32 md:px-40 lg:px-80 ease-in-out duration-300 space-y-3 bg-slate-100 shadow-sm">
          <div className="p-1 flex flex-col">
            <span className="text-sm truncate text-gray-500">I AM</span>
            <div className="flex flex-row items-center gap-x-2">
              <span className="truncate">
                <strong>
                  {vaccine.vaccine_status
                    ? vaccine.vaccine_status
                    : "No status."}
                </strong>
              </span>
              {vaccine.vaccine_status ? (
                <Icon
                  className="p-1 rounded-full bg-blue-600"
                  icon={<FaCheck className="h-3 w-3 text-white" />}
                />
              ) : (
                <Icon
                  className="p-1 rounded-full bg-gray-600"
                  icon={<FaQuestion className="h-3 w-3 text-white" />}
                />
              )}

              <div
                className="ml-auto cursor-pointer underline underline-offset-2 hover:text-blue-700 hover:decoration-blue-700"
                onClick={() => {
                  setVaccineForm(!vaccineForm);
                }}
              >
                {hasVaccine ? (
                  <span>
                    <strong>UPDATE</strong>
                  </span>
                ) : (
                  <span>
                    <strong>SET UP PROFILE</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 sm:px-32 md:px-40 lg:px-80 ease-in-out duration-300 bg-slate-50 text-gray-800 shadow-sm">
          {vaccine.vaccine_status === "NOT-VACCINATED" ? (
            <span>I have not taken any COVID-19 vaccines.</span>
          ) : (
            <span>MY VACCINE</span>
          )}
        </div>

        {vaccine.vaccine_status === "NOT-VACCINATED" ? (
          <></>
        ) : (
          <div className="m-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300">
            <div className="flex flex-col space-y-5">
              <div className="flex flex-row items-center space-x-3">
                <Icon
                  className="p-2 rounded-full bg-indigo-400"
                  icon={<FaSyringe className="h-5 w-5 text-white" />}
                />

                <span>
                  {vaccine.vaccine_date
                    ? vaccine.vaccine_date
                    : "You have not set up your vaccine name."}
                </span>
              </div>

              <div className="flex flex-row items-center space-x-3">
                <Icon
                  className="p-2 rounded-full bg-indigo-400"
                  icon={<FaIdCard className="h-5 w-5 text-white" />}
                />
                <div className="flex flex-col">
                  <span>
                    {vaccine.vaccine_serial_no
                      ? vaccine.vaccine_serial_no
                      : "You have not set up your vaccine card serial number."}
                  </span>
                  <span className="text-sm text-gray-500">
                    Vaccination serial no.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!hasVaccine && (
          <div className="mt-16 p-5 mx-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300 rounded-full bg-gray-500">
            <div className="flex flex-row items-center space-x-3">
              <Icon
                className="p-1 rounded-full bg-orange-400"
                icon={<AiOutlineExclamation className="h-4 w-4 text-white" />}
              />

              <div className="flex flex-col text-white">
                <span>Please set up your vaccine profile.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VaccineProfile;
