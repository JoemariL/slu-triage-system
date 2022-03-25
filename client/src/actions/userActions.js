import API from "../modules/api"

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const getUserData = async(id) => {
    return API.get(`/user/get/${id}`, config)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        })
}

export const getRefreshToken = async (token) => {
    const body = JSON.stringify({
        token
    })
    return API.post("/controller/token", body, config)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        })
}