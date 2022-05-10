import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { updateVaccine } from "../../../actions/userActions";
import useForm from "../../../hooks/useForm";
import {
  VaccineFormInitialState,
  VaccineFormValidations,
} from "./vaccine-form";
import { Input, Button, RadioButton } from "../../../Components/commons";
import { getUserData } from "../../../actions/userActions";

const VaccineModule = ({ onSuccess = () => {}, onError = () => {} }) => {
  const { changeHandler, formValues, setFormValues } = useForm(
    VaccineFormInitialState,
    VaccineFormValidations
  );

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      const user = await getUserData();
      const vaccine = user.vaccination_details[0];
      if (vaccine) {
        setFormValues(vaccine);
      } else {
        setFormValues(VaccineFormInitialState);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    let {
      vaccine_status,
      vaccine_date: vaccineDate,
      vaccine_serial_no,
    } = formValues;
    let vacDate = new Date(vaccineDate);

    if (vaccine_status === "NOT VACCINATED") {
      const response = await updateVaccine({ vaccine_status });

      if (response.hasOwnProperty("message")) {
        setIsLoading(false);
        onError();
      } else {
        setIsLoading(false);
        onSuccess();
      }
    } else {
      const response = await updateVaccine({
        vaccine_status,
        vaccine_date: vacDate,
        vaccine_serial_no,
      });

      if (response.hasOwnProperty("message")) {
        setIsLoading(false);
        onError();
      } else {
        setIsLoading(false);
        onSuccess();
      }
    }
  };

  return (
    <>
      <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
        <div>
          <p>
            <span className="text-lg font-bold">INSTRUCTION</span>
            <br />
            Setup or update your vaccine profile truthfully.
          </p>
        </div>

        <div className="flex flex-col space-y-5">
          <p className="font-bold">
            VACCINATION STATUS&nbsp;<span className="text-red-600">*</span>
          </p>

          <div className="flex flex-col space-y-3" onChange={changeHandler}>
            <RadioButton
              name="vaccine_status"
              id="vaccine_status"
              value="FULLY VACCINATED"
              label="FULLY VACCINATED"
              checked={
                formValues?.vaccine_status === "FULLY VACCINATED" ? true : false
              }
              required
            />
            <RadioButton
              name="vaccine_status"
              id="vaccine_status"
              value="PARTIALLY VACCINATED"
              label="PARTIALLY VACCINATED"
              checked={
                formValues?.vaccine_status === "PARTIALLY VACCINATED"
                  ? true
                  : false
              }
              required
            />
            <RadioButton
              name="vaccine_status"
              id="vaccine_status"
              value="NOT VACCINATED"
              label="NOT VACCINATED"
              checked={
                formValues?.vaccine_status === "NOT VACCINATED" ? true : false
              }
              required
            />
          </div>
        </div>

        <div
          className={classnames(
            "space-y-5",
            formValues?.vaccine_status === "NOT VACCINATED" ? "sr-only" : ""
          )}
        >
          <div className="flex flex-col space-y-3">
            <Input
              label="DATE OF YOUR MOST RECENT SHOT"
              id="vaccine_date"
              name="vaccine_date"
              type="date"
              max={new Date().toISOString().slice(0, 10)}
              onChange={changeHandler}
              disabled={
                formValues?.vaccine_status === "NOT VACCINATED" ? true : false
              }
              required
            />
          </div>

          <div className="flex flex-col">
            <Input
              label="VACCINATION CARD SERIAL NO."
              id="vaccine_serial_no"
              name="vaccine_serial_no"
              type="text"
              onChange={changeHandler}
              value={
                formValues?.vaccine_serial_no
                  ? formValues.vaccine_serial_no
                  : ""
              }
              disabled={
                formValues?.vaccine_status === "NOT VACCINATED" ? true : false
              }
            />
          </div>
        </div>

        <Button label="Save" type="submit" loading={isLoading} />
      </form>
    </>
  );
};

export default VaccineModule;
