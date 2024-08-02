import { LOGIN, REGISTER, ERROR, LOADING, SIGN_OUT } from "../actions/action-types";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  isError: false,
  isSuccess: false,
  error: null,
  remember: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      localStorage.setItem("token", action.token);
      localStorage.setItem("user", JSON.stringify(action.user));
      return{
        token: action.token,
        user: action.user,
        loading: false,
        isError: false,
        isSuccess: true,
        error: null
      }
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    case ERROR:
      return {
        isError: true,
        loading: false,
        error: action.error || "ERROR",
        token: null,
      }
    case SIGN_OUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return{
        ...state,
        token: null,
        user: null
      }
    default:
      return state;
  }
};