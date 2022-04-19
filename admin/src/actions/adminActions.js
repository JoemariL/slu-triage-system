import API from "../modules/api";
import Cookies from "js-cookie";

const config = {
    headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + Cookies.get("accessToken")
    },
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

export const getAllUser = async() => {
    return API.get("admin/get-all-users", config)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err?.response?.data?.errors
        })
}

export const getAllAdmin = async() => {
    return API.get("admin/get-all-admin", config)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err?.response?.data?.errors
        })
}

export const getUser = async(id) => {
    return API.get(`admin/get-user/${id}`, config)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err?.response?.data?.errors
        })
}

export const resetPassword = async(payload) => {
    const body = JSON.stringify({
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword,
        confirmNewPassword: payload.confirmNewPassword
    })
    return API.patch("admin/update/password", body, config)
        .then(() => {
            return true
        })
        .catch((err) => {
            return err?.response?.data?.errors
        })
}