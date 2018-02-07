import axios from "axios";
import { getRedirectPath } from "../util";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const initState = {
  redirectTo: "",
  isAuth: false,
  msg: "",
  user: "",
  pwd: "",
  type: ""
};
//reducer
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        redirectTo: getRedirectPath(action.payload),
        msg: "",
        isAuth: true,
        ...action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        redirectTo: getRedirectPath(action.payload),
        msg: "",
        isAuth: true,
        ...action.payload
      };
    case ERROR_MSG:
      return { ...state, msg: action.msg, isAuth: false };
    default:
      return state;
  }
}

//actions
function errorMsg(msg) {
  return { type: ERROR_MSG, msg: msg };
}

function loginSuccess(data) {
  return { type: LOGIN_SUCCESS, payload: data };
}

function registerSuccess(data) {
  return { type: REGISTER_SUCCESS, payload: data };
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg("Must input username and password");
  }

  return dispatch => {
    axios.post("/user/login", { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg("Must input username and password");
  }

  if (pwd !== repeatpwd) {
    return errorMsg("The password is not matched");
  }

  return dispatch => {
    axios.post("/user/register", { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess({ user, pwd, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
