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