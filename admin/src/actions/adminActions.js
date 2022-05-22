import API from "../config/api";
import Cookies from "js-cookie";

const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + Cookies.get("accessToken"),
  },
};

const authorization = "Bearer " + Cookies.get("accessToken")

export const deleteUser = async (id) => {
  return API.delete(`admin/deleteUser/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + Cookies.get("accessToken"),
    },
  })
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};

export const deleteAdmin = async (id) => {
  return API.delete(`admin/delete/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + Cookies.get("accessToken"),
    },
  })
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err.response?.data?.errors;
    });
};

export const getAllUser = async () => {
  return API.get("admin/get-all-users", config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err?.response?.data?.errors;
    });
};

export const getAllAdmin = async () => {
  return API.get("admin/get-all-admin", config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err?.response?.data?.errors;
    });
};

export const getUser = async (id) => {
  return API.get(`admin/get-user/${id}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err?.response?.data?.errors;
    });
};

export const adminResetPassword = async (payload) => {
  const body = JSON.stringify({
    oldPassword: payload.oldPassword,
    newPassword: payload.newPassword,
    confirmNewPassword: payload.confirmNewPassword,
  });
  return API.patch("/admin/update/password", body, config)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err?.response?.data?.errors;
    });
};

export const userResetPassword = async (id) => {
  return API.post(`controller/user-change-password/${id}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err?.response?.data?.errors;
    });
};

export const getAllQr = async () => {
  return API.get("/school/get/qr", config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err?.response?.data?.errors;
    });
};

export const deleteSchool = async (id) => {
  return API.delete(`/school/delete-school/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + Cookies.get("accessToken"),
    },
  })
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err?.response?.data?.errors;
    });
};

export const addSchool = async (name) => {
  const body = JSON.stringify({
    school: name,
  });
  return API.post("/school/add-school", body, config)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err?.response?.data?.errors;
    });
};

export const addSchoolGate = async (id, gate) => {
  const body = JSON.stringify({
    gate,
  });
  return API.post(`/school/add-gate/${id}`, body, config)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err?.response?.data?.errors;
    });
};

export const regenerateQR = async (id, gate) => {
  return API.post(`/school/refresh-qr/${id}/${gate}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + Cookies.get("accessToken"),
    },
  })
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err?.response?.data?.errors;
    });
};

export const deleteGate = async (id, gate) => {
  return API.post(`/school/removeQr/${id}/${gate}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + Cookies.get("accessToken"),
    },
  })
    .then(() => {
      return true;
    })
    .catch((err) => {
      return err?.response?.data?.errors;
    });
};
