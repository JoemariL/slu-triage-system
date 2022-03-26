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

export const updateVaccine = async (payload) => {
    const body = JSON.stringify({
        vaccineStatus: payload.vacStatus,
        vaccineName: payload.vacName,
        vaccineSerial: payload.vacSerial,
    })
    return API.post("/user/vaccination", body, config)
        .then((res) => {
            return true
        })
        .catch((err) => {
            return false
        })
}