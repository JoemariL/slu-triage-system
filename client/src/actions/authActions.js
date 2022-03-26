import API from "../modules/api"
import Cookies from 'js-cookie';

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
            return Cookies.get('accessToken')
        })
        .catch((err) => {
            return err.response?.data?.errors
        })
}

export const logout = async () => {
    return API.delete("/controller/logout", {
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(() => {
        return true
    })
    .catch(() => {
        return false
    })
}