import { createSlice } from "@reduxjs/toolkit";

const authState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  isLoggedIn: false,
};
//console.log(authState.token,authState.email)

const authSlice = createSlice({
  name: "authentication",
  initialState: authState,
  reducers: {

    login(currState, action) {
     // console.log(action)
     currState.email = action.payload.emailId;
     currState.token = action.payload.token;

     localStorage.setItem("email", currState.email);
     localStorage.setItem("token", currState.token );

      currState.isLoggedIn = true;
    },
    logout(currState) {
      currState.token = null;
      currState.email = null;

      localStorage.removeItem("token");
      localStorage.removeItem("email");

      currState.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
