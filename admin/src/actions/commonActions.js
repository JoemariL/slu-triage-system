import API from "../modules/api";
import Cookies from "js-cookie";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const getHdfToday = async() => {
    return API.get("/hdf/day", config)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response?.data?.errors;
        })
}