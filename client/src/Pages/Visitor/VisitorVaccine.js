import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineExclamation } from "react-icons/ai";
import { FaCheck, FaIdCard, FaQuestion, FaSyringe } from "react-icons/fa";
import { Appbar } from "../../Components";
import { Icon } from "../../Components/commons";
import { getUserData } from "../../actions/userActions";
import useAuth from "../../hooks/useAuth";
import VaccineForm from "./VaccineForm";

function VisitorVaccine() {
  const navigate = useNavigate();
  const [vaccine, setVaccine] = useState({})
  const [vaccineForm, setVaccineForm] = useState(false);

  const userVaccine = JSON.parse(localStorage.getItem('userVaccine'))
  useEffect(() => {
    if(userVaccine) {
      setVaccine(userVaccine)
    }
  },[vaccineForm])



  return (
    <div className="relative text-sm sm:text-base">
      {/* Vaccine form. */}
      {vaccineForm && (
        <VaccineForm
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
            navigate("/visitor");
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
                <strong>{vaccine ? <strong>{vaccine.vaccine_status}</strong> : "..."}</strong>
              </span>

              <div
                className="ml-auto cursor-pointer underline underline-offset-2 hover:text-blue-700 hover:decoration-blue-700"
                onClick={() => {
                  setVaccineForm(!vaccineForm);
                }}
              >
                <span>
                  <strong>UPDATE</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 sm:px-32 md:px-40 lg:px-80 ease-in-out duration-300 bg-slate-50 text-gray-800 shadow-sm">
          <span>MY VACCINE</span>
        </div>

        <div className="m-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300">
          <div className="flex flex-col space-y-5">
            <div className="flex flex-row items-center space-x-3">
              <Icon
                className="p-2 rounded-full bg-indigo-400"
                icon={<FaSyringe className="h-5 w-5 text-white" />}
              />

              <span>{vaccine ? <span>{vaccine.vaccine_date}</span> : "..."}</span>
            </div>

            <div className="flex flex-row items-center space-x-3">
              <Icon
                className="p-2 rounded-full bg-indigo-400"
                icon={<FaIdCard className="h-5 w-5 text-white" />}
              />
              <div className="flex flex-col">
                <span>SERIAL NO.</span>
                <span className="text-sm text-gray-500">
                  {vaccine ? <span>{vaccine.vaccine_serial_no}</span> : "..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorVaccine;
