import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSyringe, FaIdCard, FaCheck, FaQuestion } from "react-icons/fa";
import { Button, Icon } from "../../Components/commons";
import { VaccineForm } from "../../Components/presets/mobile";
import Appbar from "../../Components/presets/mobile/Appbar";
import { getUserData } from "../../actions/userActions";
import useAuth from "../../hooks/useAuth";

function VaccineProfile(props) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [updateVaccineForm, setUpdateVaccineForm] = useState(false);
  const [vaccine, setVaccine] = useState({});

  useEffect(() => {
    (async function () {
      const user = await getUserData();
      if (!user?.vaccination_details[0]) {
        setVaccine({
          vaccine_status: null,
          vaccine_name: null,
          vaccine_serial_no: null,
        });
      } else {
        setVaccine(user.vaccination_details[0]);
      }
    })();
  }, [auth]);

  return (
    <div className="text-base relative">
      {updateVaccineForm && (
        <VaccineForm
          user={vaccine}
          className="absolute h-full w-full z-50"
          returnOnClick={() => setUpdateVaccineForm(false)}
          cancelOnClick={() => setUpdateVaccineForm(false)}
        />
      )}

      <div>
        <Appbar
          onClick={() => {
            navigate("/home");
          }}
          className="bg-white"
          headerText="Vaccine Profile"
        />
      </div>

      <div className="mx-5 pt-20 space-y-5 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
        <div className="my-5 space-y-5">
          {/* Vaccinated confirmation. */}
          <div className="flex flex-col space-y-5">
            <span className="text-gray-600">
              <strong>COVID-19 VACCINATION RECORD</strong>
            </span>

            <div className="flex flex-row space-x-5 items-center">
              {vaccine.vaccine_status ? (
                <Icon
                  className="p-2 rounded-full bg-blue-600"
                  icon={<FaCheck className="h-4 w-4 text-white" />}
                />
              ) : (
                <Icon
                  className="p-2 rounded-full bg-red-600"
                  icon={<FaQuestion className="h-4 w-4 text-white" />}
                />
              )}
              <span className="truncate">
                {vaccine.vaccine_status ? vaccine.vaccine_status : "TBD"}
              </span>
            </div>
          </div>

          <hr />

          {/* Vaccinated details. */}
          <div className="flex flex-col space-y-5">
            <div className="text-gray-600">
              <span>
                <strong>COVID-19 VACCINE</strong>
              </span>
            </div>
            <div className="flex flex-row space-x-5 items-center">
              <Icon
                className="p-2 rounded-full bg-blue-400"
                icon={<FaSyringe className="h-4 w-4 text-white" />}
              />
              <span className="truncate">
                {vaccine.vaccine_name ? vaccine.vaccine_name : "TBD"}
              </span>
            </div>

            <div className="flex flex-row space-x-5 items-center">
              <Icon
                className="p-2 rounded-full bg-green-400"
                icon={<FaIdCard className="h-4 w-4 text-white" />}
              />
              <span className="truncate">
                {vaccine.vaccine_serial_no ? vaccine.vaccine_serial_no : "TBD"}
              </span>
            </div>
          </div>
        </div>

        <br />
        <div>
          <Button
            buttonStyle="h-12 rounded text-white bg-blue-800 hover:bg-blue-700"
            label="UPDATE PROFILE"
            type={"button"}
            onClick={() => setUpdateVaccineForm(!updateVaccineForm)}
          />
        </div>
        <br />
      </div>
    </div>
  );
}

export default VaccineProfile;
