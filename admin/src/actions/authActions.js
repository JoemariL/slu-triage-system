import API from "../modules/api";
import Cookies from "js-cookie";

const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

export const login = async(username, password) => {
    const body = JSON.stringify({
        username,
        password
    })
    return API.post("/controller/admin/login", body, config)
        .then(() => {
            return Cookies.get("accessToken");
        })
        .catch((err) => {
            return err.response?.data?.errors;
        })
}

export const logout = async () => {
    return API.delete("/controller/logout", {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + Cookies.get("accessToken"),
      },
    })
      .then(() => {
        return true;
    })
      .catch(() => {
        return false;
      });
  };