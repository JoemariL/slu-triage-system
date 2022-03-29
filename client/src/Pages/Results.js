import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillCalendar } from "react-icons/ai";
import { FaCheck, FaSchool } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Icon } from "../Components/commons";
import { Appbar } from "../Components/";
import { getUserData, getHdfDay } from "../actions/userActions";
import useAuth from "../hooks/useAuth";
import { Approved, Disapproved } from "../assets";

function Results() {
  const navigate = useNavigate();

  // Actions & hooks.
  const { auth, setAuth } = useAuth();

  // User variables.
  const [hdf, setHdf] = useState({});

  const [hasHDF, setHasHDF] = useState(false);

  useEffect(() => {
    (async function () {
      const user = await getHdfDay();
      if (!user || user.length === 0) {
        setHdf({});
      } else {
        setHdf(user[0]);
      }
    })();
  }, [auth]);

  return (
    <div className="text-sm sm:text-base">
      {/* Appbar. */}
      <div>
        <Appbar
          headerText="Entry Status"
          onClick={() => {
            navigate("/home");
          }}
        />
      </div>

      {/* Main. */}
      {hdf.allowed ? (
        <div className="pt-12 cursor-default">
          <div className="p-5 sm:px-32 md:px-40 lg:px-80 ease-in-out duration-300 bg-slate-100 shadow-sm">
            <div className="flex flex-col items-center space-y-3">
              <img
                className="object-contain rounded-full h-auto w-48"
                src={Approved}
                alt="saint louis university triage application allowed"
              />

              <p className="text-xl text-center  text-gray-500">
                <strong>
                  You are allowed to enter in <br />
                  Saint Louis University campus!
                </strong>
              </p>
            </div>
          </div>

          <div className="p-5 sm:px-32 md:px-40 lg:px-80 ease-in-out duration-300 bg-slate-50 text-gray-800 shadow-sm">
            <span>ENTRY DETAILS</span>
          </div>

          <div className="m-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300">
            <div className="flex flex-col space-y-5">
              <div className="flex flex-row items-center space-x-3">
                <Icon
                  className="p-2 rounded-full bg-indigo-400"
                  icon={<AiFillCalendar className="h-5 w-5 text-white" />}
                />
                <div className="flex flex-col">
                  <span>{hdf.createdAt}</span>
                  <span className="text-sm text-gray-500">
                    TIME HDF CREATED
                  </span>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-3">
                <Icon
                  className="p-2 rounded-full bg-yellow-600"
                  icon={<FaSchool className="h-5 w-5 text-white" />}
                />
                <div className="flex flex-col">
                  {hdf.entry_date === undefined || hdf.entry_date === null ? (
                    <span>You have not entered the campus yet.</span>
                  ) : (
                    <span>{hdf.entry_date}</span>
                  )}
                  <span className="text-sm text-gray-500">
                    TIME CAMPUS ENTERED
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300 bg-blue-600">
            <div className="flex flex-row items-center space-x-3">
              <Icon
                className="p-2 rounded-full bg-blue-400"
                icon={<FaCheck className="h-5 w-5 text-white" />}
              />

              <div className="flex flex-col text-white">
                <span>ALLOWED</span>
                <span className="text-sm">Entry status</span>
              </div>
            </div>
          </div>

          <div className="p-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300 bg-blue-100">
            <article>
              <span>
                <strong>NOTE</strong>
              </span>

              <p>
                Strictly observe minimum public health standards and Saint Louis
                University's health and safety protocols.
              </p>
            </article>
          </div>
        </div>
      ) : (
        <div className="pt-12 cursor-default">
          <div className="p-5 sm:px-32 md:px-40 lg:px-80 ease-in-out duration-300 bg-slate-100 shadow-sm">
            <div className="flex flex-col items-center space-y-3">
              <img
                className="object-contain rounded-full h-auto w-48"
                src={Disapproved}
                alt="saint louis university triage application allowed"
              />

              <p className="text-xl text-center  text-gray-500">
                <strong>
                  You are not allowed to enter in <br />
                  Saint Louis University campus!
                </strong>
              </p>
            </div>
          </div>

          <div className="p-5 sm:px-32 md:px-40 lg:px-80 ease-in-out duration-300 bg-slate-50 text-gray-800 shadow-sm">
            <span>ENTRY DETAILS</span>
          </div>

          <div className="m-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300">
            <div className="flex flex-col space-y-5">
              <div className="flex flex-row items-center space-x-3">
                <Icon
                  className="p-2 rounded-full bg-indigo-400"
                  icon={<AiFillCalendar className="h-5 w-5 text-white" />}
                />
                <div className="flex flex-col">
                  <span>{hdf.createdAt}</span>
                  <span className="text-sm text-gray-500">
                    TIME HDF CREATED
                  </span>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-3">
                <Icon
                  className="p-2 rounded-full bg-yellow-600"
                  icon={<FaSchool className="h-5 w-5 text-white" />}
                />
                <div className="flex flex-col">
                  {hdf.entry_date === undefined || hdf.entry_date === null ? (
                    <span>You have not entered the campus yet.</span>
                  ) : (
                    <span>{hdf.entry_date}</span>
                  )}
                  <span className="text-sm text-gray-500">
                    TIME CAMPUS ENTERED
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300 bg-red-600">
            <div className="flex flex-row items-center space-x-3">
              <Icon
                className="p-2 rounded-full bg-red-400"
                icon={<ImCross className="h-5 w-5 text-white" />}
              />

              <div className="flex flex-col text-white">
                <span>NOT ALLOWED</span>
                <span className="text-sm">Entry status</span>
              </div>
            </div>
          </div>

          <div className="p-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300 bg-red-100">
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

          <div className="p-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300 bg-red-50">
            <article>
              <span>
                <strong>NOTE FOR VISITORS</strong>
              </span>

              <p>
                <span className="underline underline-offset-2 decoration-blue-800">
                  <strong>
                    Proceed to holding area located at SILANG BUILDING LOBBY.
                  </strong>
                </span>
                <br /> Observe minimum public health standards.
              </p>
            </article>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
