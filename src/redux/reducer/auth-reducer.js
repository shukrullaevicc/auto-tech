const initialState = {
  token: null,
  user: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
    case "REGISTER_USER":
      localStorage.setItem("token", action.data.payload.token);
      return {
        token: action.data.token,
        user: action.data.user,
      };
    default:
      return state;
  }
};