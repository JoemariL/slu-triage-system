import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeadSideCough, FaTired, FaToiletPaper } from "react-icons/fa";
import { ImFileEmpty } from "react-icons/im";
import { IoSadSharp } from "react-icons/io5";
import {
  MdSick,
  MdOutlineMedication,
  MdOutlinePregnantWoman,
} from "react-icons/md";
import { RiTempColdFill } from "react-icons/ri";
import { Button, Icon } from "../../Components/commons";
import { Appbar } from "../../Components";
import VHDForm from "./VHDForm";

function VisitorHDF() {
  const navigate = useNavigate();
  const [generateHDF, setGenerateHDF] = useState(false);
  const [hdf, setHdf] = useState({});

  const userHdf = JSON.parse(localStorage.getItem('userHDF'))
  useEffect(() => {
    if(userHdf){
      setHdf(userHdf)
    }
  }, [])

  return (
    <div className="relative text-sm sm:text-base">
      {/* Generate HDF Form. */}
      {generateHDF && <VHDForm returnOnClick={() => setGenerateHDF(false)} />}

      {/* Appbar. */}
      <div>
        <Appbar
          headerText="Health Declaration Form"
          onClick={() => {
            navigate("/visitor");
          }}
        />
      </div>

      {/* Main. */}
      <div className="py-12 cursor-default">
        <>
          {/* COVID-19 Exposure & Positive data. */}
          <div className="p-5 sm:px-32 md:px-40 lg:px-80 ease-in-out duration-300 space-y-3 bg-slate-100 shadow-sm">
            <div className="text-md text-gray-500">
              <span className="truncate">
                <strong>COVID-19 HISTORY</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="p-5 flex flex-col bg-white shadow-sm">
                <span className="text-sm truncate text-gray-500">EXPOSURE</span>
                <span className="truncate">
                  <strong>{hdf.covid_exposure ? <strong>YES</strong> : "NO"}</strong>
                </span>
              </div>

              <div className="p-5 flex flex-col bg-white shadow-sm">
                <span className="text-sm truncate text-gray-500">POSITIVE</span>
                <span className="truncate">
                  <strong>{hdf.covid_positive ? <strong>YES</strong> : "NO"}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Medical history. */}
          <div className="p-5 sm:px-32 md:px-40 lg:px-80 ease-in-out duration-300 flex flex-row items-center space-x-3 bg-slate-50 text-gray-800 shadow-sm">
              <Icon icon={<MdOutlineMedication className="h-6 w-6" />} />
              {hdf.fever ||
              hdf.cough ||
              hdf.cold ||
              hdf.sore_throat ||
              hdf.diff_breathing ||
              hdf.diarrhea ? (
                <span>MEDICAL HISTORY</span>
              ) : (
                <span>NO MEDICAL HISTORY</span>
              )}
          </div>

          {/* Medical history list. */}
          <div className="m-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300">
              <div className="flex flex-col space-y-5">
                {hdf.fever && (
                  <div className="flex flex-row items-center space-x-3">
                    <Icon
                      className="p-2 rounded-full bg-red-400"
                      icon={<MdSick className="h-5 w-5 text-white" />}
                    />
                    <div className="flex flex-col">
                      <span>FEVER</span>
                      <span className="text-sm text-gray-500">Lagnat</span>
                    </div>
                  </div>
                )}

                {hdf.cough && (
                  <div className="flex flex-row items-center space-x-3">
                    <Icon
                      className="p-2 rounded-full bg-green-400"
                      icon={<FaHeadSideCough className="h-5 w-5 text-white" />}
                    />
                    <div className="flex flex-col">
                      <span>COUGH</span>
                      <span className="text-sm text-gray-500">Ubo</span>
                    </div>
                  </div>
                )}

                {hdf.cold && (
                  <div className="flex flex-row items-center space-x-3">
                    <Icon
                      className="p-2 rounded-full bg-blue-400"
                      icon={<RiTempColdFill className="h-5 w-5 text-white" />}
                    />
                    <div className="flex flex-col">
                      <span>COLD</span>
                      <span className="text-sm text-gray-500">Sipon</span>
                    </div>
                  </div>
                )}

                {hdf.sore_throat && (
                  <div className="flex flex-row items-center space-x-3">
                    <Icon
                      className="p-2 rounded-full bg-yellow-400"
                      icon={<IoSadSharp className="h-5 w-5 text-white" />}
                    />
                    <div className="flex flex-col">
                      <span>SORE THROAT</span>
                      <span className="text-sm text-gray-500">
                        Pananakit ng lalamunan
                      </span>
                    </div>
                  </div>
                )}

                {hdf.diff_breathing && (
                  <div className="flex flex-row items-center space-x-3">
                    <Icon
                      className="p-2 rounded-full bg-gray-400"
                      icon={<FaTired className="h-5 w-5 text-white" />}
                    />
                    <div className="flex flex-col">
                      <span>DIFFICULTY IN BREATHING</span>
                      <span className="text-sm text-gray-500">
                        Hirap sa paghinga
                      </span>
                    </div>
                  </div>
                )}

                {hdf.diarrhea && (
                  <div className="flex flex-row items-center space-x-3">
                    <Icon
                      className="p-2 rounded-full bg-lime-400"
                      icon={<FaToiletPaper className="h-5 w-5 text-white" />}
                    />
                    <div className="flex flex-col">
                      <span>DIARRHEA</span>
                      <span className="text-sm text-gray-500">
                        Madalas na pagdumi
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          {/* Pregnancy status. */}
          <div className="p-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300 rounded bg-cyan-600">
            <div className="flex flex-row items-center space-x-3">
              <Icon
                className="p-2 rounded-full bg-cyan-400"
                icon={<MdOutlinePregnantWoman className="h-5 w-5 text-white" />}
              />
              <div className="flex flex-col text-white">
                  {hdf.pregnant === undefined || hdf.pregnant === null ? (
                    <span>NOT APPLICABLE</span>
                  ) : hdf.pregnant ? (
                    <span>PREGNANT</span>
                  ) : (
                    <span>NOT PREGNANT</span>
                  )}
                <span className="text-sm">Pregnancy status</span>
              </div>
            </div>
          </div>
        </>

        {/* Fill out HDF Form. */}
        <br />
        <div className="p-5 sm:px-32 md:px-40 lg:px-80 ease-in-out duration-300">
          <Button
            buttonStyle="btn-primary"
            label="Fill out your Health Declaration Form"
            type="button"
            onClick={() => {
              setGenerateHDF(!generateHDF);
            }}
          />

          <span className="text-sm text-center text-gray-500">
            Health Declaration Form will reset every 12:00 AM GMT +08.
          </span>
        </div>
      </div>
    </div>
  );
}

export default VisitorHDF;
