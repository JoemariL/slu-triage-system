import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/commons";
import { HDFForm } from "../../Components/presets/mobile";
import Appbar from "../../Components/presets/mobile/Appbar";

function HDF(props) {
  const navigate = useNavigate();
  const [createHDF, setCreateHDF] = useState(false);

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
        <div className="grid grid-flow-row auto-rows-auto bg-slate-300">
          <div className="p-5">
            <table className="w-full table-auto border-collapse">
              <tbody>
                <tr>
                  <td>
                    <strong>COVID-19</strong>
                  </td>
                </tr>
                <tr>
                  <td>EXPOSURE</td>
                  <td>...</td>
                </tr>

                <tr>
                  <td>POSITIVE</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-flow-row auto-rows-auto bg-slate-200">
          <div className="p-5 flex flex-row justify-around items-center text-lg rounded-2xl">
            <span>
              <strong>MEDICAL HISTORY</strong>
            </span>
          </div>
          <div className="p-5 flex flex-col text-lg rounded-xl">
            <ul>
              <li>...</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-flow-row auto-rows-auto space-y-5 bg-slate-100">
          <div className="p-5 flex flex-row justify-around items-center text-lg rounded-2xl">
            <span>PREGNANT</span>
            <span>
              <strong>...</strong>
            </span>
          </div>
        </div>

        <div className="p-2 grid grid-flow-row auto-rows-auto space-y-5 bg-blue-300">
          <div className="h-16 px-5 flex flex-col justify-around items-center text-lg rounded-2xl">
            <span>DEPARTMENT / DESTINATION</span>
            <span>
              <u>...</u>
            </span>
          </div>
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
