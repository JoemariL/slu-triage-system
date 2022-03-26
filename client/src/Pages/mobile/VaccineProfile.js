import React, { useState, useEffect } from "react";
import { Button } from "../../Components/commons";
import { VaccineForm } from "../../Components/presets/mobile";
import Appbar from "../../Components/presets/mobile/Appbar";

function VaccineProfile(props) {
  const [updateVaccineForm, setUpdateVaccineForm] = useState(false);

  return (
    <div className="text-base relative">
      {updateVaccineForm && (
        <VaccineForm
          className="absolute h-full w-full z-50"
          returnOnClick={() => setUpdateVaccineForm(false)}
          cancelOnClick={() => setUpdateVaccineForm(false)}
        />
      )}

      <div>
        <Appbar className="bg-white" headerText="Vaccine Profile" />
      </div>

      <div className="mx-5 pt-20 space-y-5 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
        <div className="grid grid-flow-row auto-rows-auto rounded-xl bg-blue-300">
          <div className="p-5">
            <table className="w-full table-auto border-collapse">
              <tbody>
                <tr>
                  <td>
                    <strong>COVID-19 VACCINATION RECORD</strong>
                  </td>
                </tr>
                <tr>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-flow-row auto-rows-auto rounded-xl bg-blue-200">
          <div className="p-5 space-y-5">
            <table className="w-full table-auto border-collapse">
              <tbody>
                <tr>
                  <td>
                    <strong>COVID-19 VACCINE</strong>
                  </td>
                </tr>
                <tr>
                  <td>...</td>
                </tr>
              </tbody>
            </table>

            <table className="w-full table-auto border-collapse">
              <tbody>
                <tr>
                  <td>
                    <strong>VACCINATION SERIAL NUMBER</strong>
                  </td>
                </tr>
                <tr>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-flow-row auto-rows-auto rounded-xl bg-blue-100">
          <div className="p-5">
            <table className="w-full table-auto border-collapse">
              <tbody>
                <tr>
                  <td>
                    <strong>BOOSTER</strong>
                  </td>
                </tr>
                <tr>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
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
