import API from "../modules/api"

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const getUserData = async() => {
    return API.get(`/user/get`, config)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        })
}

export const getRefreshToken = async () => {
    return API.post("/controller/token", config)
        .then(() => {
            return true
        })
        .catch(() => {
            return false
        })
}