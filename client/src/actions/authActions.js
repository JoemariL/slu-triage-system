import API from "../modules/api"
import jwtDecode from "jwt-decode";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const login = async (email, password) => {
    const body = JSON.stringify({
        email,
        password
    })
    return API.post("/controller/user/login", body, config)
        .then((res) => {
            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
            return jwtDecode(localStorage.getItem('refreshToken')).id
        })
        .catch((err) => {
            return err.response?.data?.errors
        })
}

export const logout = async (token) => {
    return API.delete("/controller/logout", {
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            token
        }
    })
    .then(() => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        return true
    })
    .catch(() => {
        return false
    })
}