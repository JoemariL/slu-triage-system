import API from "../modules/api";
import Cookies from "js-cookie";

const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + Cookies.get("accessToken"),
  },
};

export const getUserData = async () => {
  return API.get("/user/get", config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};

export const getRefreshToken = async () => {
  return API.post("/controller/token", config)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};

export const updateVaccine = async (payload) => {
  const body = JSON.stringify({
    vaccineStatus: payload.vacStatus,
    vaccineName: payload.vacName,
    vaccineSerial: payload.vacSerial,
  });
  return API.post("/user/vaccination", body, config)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};

export const getHdfDay = async () => {
  return API.get("/hdf/get", config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};

export const generateHdf = async (payload) => {
  const body = JSON.stringify({
    covidExposure: payload.exposure,
    covidPositive: payload.positive,
    fever: payload.fever,
    cough: payload.cough,
    cold: payload.cold,
    soreThroat: payload.soreThroat,
    diffBreathing: payload.diffBreathing,
    diarrhea: payload.diarrhea,
    pregnant: payload.pregnant,
    destination: payload.destination,
  });
  return API.post("/hdf/generate", body, config)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};
