import API from "../modules/api";
import { returnErrors } from "./errActions";
import {
  LOGIN_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  CLEAR_ERRORS,
} from "../actions/types";

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["authorization"] = token;
  }

  return config;
};

// Checks the token and loads user.
export const loadUser = () => (dispatch, getState) => {
  // User loading.
  dispatch({ type: USER_LOADING });

  API.get("/user/all", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const login =
  ({ username, password }, router) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ username, password });

    API.post("/controller/user/login", body, config)
      .then(
        (res) =>
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
          }),
        router("/home")
      )
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
