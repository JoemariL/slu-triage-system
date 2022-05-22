import API from "../config/api";
import Cookies from "js-cookie";

const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + Cookies.get("accessToken"),
  },
};

export const getHdfDateRange = async (payload) => {
  const body = JSON.stringify({
    fromDate: payload.fromDate,
    toDate: payload.toDate
  })
  return API.post("/hdf/date-range", body, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
}

export const getHdfRejectedDateRange = async (payload) => {
  const body = JSON.stringify({
    fromDate: payload.fromDate,
    toDate: payload.toDate
  })
  return API.post("/hdf/rejected/date-range", body, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
}

export const getReports = async () => {
  return API.get("/admin/hdf/full-report", config) 
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
}

export const getReportDateRange = async (payload) => {
  const body = JSON.stringify({
    fromDate: payload.fromDate,
    toDate: payload.toDate
  })
  return API.post("/admin/hdf/report-range", body, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
}