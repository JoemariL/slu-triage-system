import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/commons";
import { HDFForm } from "../../Components/presets/mobile";
import Appbar from "../../Components/presets/mobile/Appbar";

import { getHdfDay } from "../../actions/userActions";
import useAuth from "../../hooks/useAuth";

function HDF(props) {
  const { auth } = useAuth()
  const navigate = useNavigate();
  const [createHDF, setCreateHDF] = useState(false);
  const [hdf, setHdf] = useState({})

  useEffect(() => {
    (async function() {
        const user = await getHdfDay();
        if(!user || user.length === 0){
          setHdf({})
        }else {
          setHdf(user[0])
        }
    })()
  },[auth])

  return (
    <div className="text-base relative">
      {createHDF && (
        <HDFForm
          className="absolute h-full w-full z-50"
          returnOnClick={() => setCreateHDF(false)}
          cancelOnClick={() => setCreateHDF(false)}
        />
      )}

      <div>
        <Appbar
          onClick={() => {
            navigate("/home");
          }}
          className="bg-white"
          headerText="Health Declaration Form"
        />
      </div>

      <div className="mx-5 pt-20 space-y-5 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
        <div className="p-5 bg-slate-300">
          <table className="w-full table-auto border-collapse">
            <tbody>
              <tr>
                <td>
                  <strong>COVID-19</strong>
                </td>
              </tr>
              <tr>
                <td>EXPOSURE</td>
                <td>{(hdf.covid_exposure === undefined) ? "..." : hdf.covid_exposure ? "YES" : "NO"}</td>
              </tr>

              <tr>
                <td>POSITIVE</td>
                <td>{(hdf.covid_positive === undefined) ? "..." : hdf.covid_positive ? "YES" : "NO"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-5 flex flex-col bg-slate-200">
          <div className="flex flex-row justify-around items-center text-lg">
            <span>
              <strong>MEDICAL HISTORY</strong>
            </span>
          </div>
          <div className="flex flex-col text-lg rounded-xl">
            <ul>
              {/* TODO: ERROR HANDLING AND PROPER DISPLAY */}
              <li>{hdf.fever ? <span>FEVER</span>: " "}</li>
              <li>{hdf.cough ? <span>COUGH</span> : " "}</li>
              <li>{hdf.cold ? <span>COLD</span> : " "}</li>
              <li>{hdf.sore_throat ? <span>SORE THROAT</span> : " "}</li>
              <li>{hdf.diff_breathing ? <span>DIFFICULTY IN BREATHING</span> : " "}</li>
              <li>{hdf.diarrhea ? <span>DIARRHEA</span> : " "}</li>
              <li>{hdf.others ? <span>{hdf.others.toUpperCase()}</span> : " "}</li>
            </ul>
          </div>
        </div>

        <div className="p-5 flex flex-row justify-around items-center text-lg bg-slate-100">
          <span>PREGNANT</span>
          <span>
            {/* TODO: ERROR HANDLING AND PROPER DISPLAY */}
            <strong>{(hdf.pregnant === undefined || hdf.pregnant === null) ? "N/A" : hdf.pregnant ? "YES" : "NO"}</strong>
          </span>
        </div>

        <div className="p-5 flex flex-col items-center text-lg bg-blue-300">
          <span>DEPARTMENT / DESTINATION</span>
          <span>
            {/* TODO: ERROR HANDLING AND PROPER DISPLAY */}
            <u>{hdf.destination ? hdf.destination.toUpperCase() : "..."}</u>
          </span>
        </div>

        <br />
        <div>
          <Button
            buttonStyle="h-12 rounded text-white bg-blue-800 hover:bg-blue-700"
            label="FILL OUT HDF"
            type={"button"}
            onClick={() => setCreateHDF(!createHDF)}
          />
        </div>
        <br />
      </div>
    </div>
  );
}

export default HDF;
