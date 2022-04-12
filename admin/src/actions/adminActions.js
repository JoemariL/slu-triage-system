import API from "../modules/api";
import Cookies from "js-cookie";

const config = {
    headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + Cookies.get("accessToken")
    },
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

/**************************** QR CODE AREA ****************************/
export const getQR = async () => {
    return API.get("/admin/get/qr", config)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response?.data?.errors;
        })
}

export const addQR = async(school, gate) => {
    const body = JSON.stringify({
        school,
        gate
    })
    return API.post("/admin/generate", body, config)
        .then(() => {
            return true
        })
        .catch((err) => {
            return err.response?.data?.errors
        })
}

export const removeQR = async(id) => {
    return API.delete(`admin/removeQR/${id}`, {
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + Cookies.get("accessToken")
        }
    })
    .then(() => {
        return true
    })
    .catch((err) => {
        return err.response?.data?.errors
    })
}

export const deleteUser = async(id) => {
    return API.delete(`admin/deleteUser/${id}`, {
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + Cookies.get("accessToken")
        }
    })
    .then(() => {
        return true
    })
    .catch((err) => {
        return err.response?.data?.errors
    })
}

export const deleteAdmin = async(id) => {
    return API.delete(`admin/delete/${id}`,{
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + Cookies.get("accessToken")
        }
    })
    .then(() => {
        return true
    })
    .catch((err) => {
        return err.response?.data?.errors
    })
}