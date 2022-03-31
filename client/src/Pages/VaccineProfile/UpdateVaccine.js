import React, { useState } from "react";
import classnames from "classnames";
import { Appbar } from "../../Components";
import { Input, RadioButton, Button } from "../../Components/commons";
import { updateVaccine } from "../../actions/userActions";

const UpdateVaccine = (props) => {
  // Actions & hooks.
  const user = props.user;

  // Vaccine form variables.
  const [vaccine, setVaccine] = useState(user);
  const [vacStatus, setVacStatus] = useState("");
  const [vacName, setVacName] = useState("");
  const [vacSerial, setVacSerial] = useState("");

  const [unvaccinated, setUnvaccinated] = useState(false);

  const handleChangeRadio = (e) => {
    setUnvaccinated(false);
    setVacStatus(e.target.value);
  };

  const handleUnvaccinated = (e) => {
    setUnvaccinated(true);
    setVacStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { vacStatus, vacName, vacSerial };
    const response = await updateVaccine(user);
    // TODO: Display something here...
    if (response.hasOwnProperty("message")) console.log(response.message);
    if (response) console.log(response);
    props.nextPage();
  };

  return (
    <div
      className={classnames(
        "absolute min-h-screen w-full z-50 bg-white",
        props.className
      )}
    >
      {/* Appbar. */}
      <div>
        <Appbar
          headerText="Update your vaccination profile"
          onClick={props.returnOnClick}
        />
      </div>

      {/* Update Vaccine Form. */}
      <div className="py-20 px-5 sm:mx-32 md:mx-40 lg:mx-80 ease-in-out duration-300 space-y-10">
        <div>
          <p>
            <span className="text-lg">
              <strong>INSTRUCTION</strong>
            </span>
            <br />
            Setup or update your vaccination profile truthfully.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <p>
              ENTER YOUR &nbsp;
              <span className="underline underline-offset-2 decoration-blue-800">
                VACCINATION STATUS.
              </span>
            </p>

            <div className="flex flex-col space-y-3">
              <RadioButton
                name="vaccinationRecord"
                id="vaccinationRecord"
                label="Fully Vaccinated"
                value="FULLY-VACCINATED"
                defaultChecked={
                  vaccine.vaccine_status === "FULLY-VACCINATED" ? true : false
                }
                onChange={handleChangeRadio}
              />
              <RadioButton
                name="vaccinationRecord"
                id="vaccinationRecord"
                value="PARTIALLY-VACCINATED"
                label="Partially Vaccinated"
                defaultChecked={
                  vaccine.vaccine_status === "PARTIALLY-VACCINATED"
                    ? true
                    : false
                }
                onChange={handleChangeRadio}
              />
              <RadioButton
                name="vaccinationRecord"
                id="vaccinationRecord"
                label="Not Vaccinated"
                value="NOT-VACCINATED"
                defaultChecked={
                  vaccine.vaccine_status === "NOT-VACCINATED" ? true : false
                }
                onChange={handleUnvaccinated}
              />
            </div>
          </div>

          <hr />

          <div className="space-y-1">
            <p>
              ENTER THE &nbsp;
              <span className="underline underline-offset-2 decoration-blue-800">
                VACCINE BRAND OR NAME
              </span>
              &nbsp; THAT YOU TOOK.
            </p>

            <div className="space-y-3">
              <Input
                inputOutStyle="rounded focus-within:border-blue-800"
                inputInStyle="h-12"
                placeholder="Enter the vaccine brand or name"
                subtitle="Sinovac, Pfizer, etc."
                id="vaccine"
                name="vaccine"
                type={"text"}
                value={vacName}
                required
                disabled={unvaccinated ? true : false}
                onChange={(e) => {
                  setVacName(e.target.value.toUpperCase());
                }}
              />

              <Input
                inputOutStyle="rounded focus-within:border-blue-800"
                inputInStyle="h-12"
                placeholder="Enter your vaccination card serial no."
                id="deptDestination"
                name="deptDestination"
                type={"text"}
                value={vacSerial}
                required
                disabled={unvaccinated ? true : false}
                onChange={(e) => setVacSerial(e.target.value.toUpperCase())}
              />
            </div>
          </div>

          <br />

          <div className="space-y-2">
            <Button buttonStyle="btn-primary" label="Save" type="submit" />
            <Button
              buttonStyle="btn-secondary"
              label="Cancel"
              type="button"
              onClick={props.cancelOnClick}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVaccine;
