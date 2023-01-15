import React, { useState } from "react";

const ExpenseContext = React.createContext({
  token: null,
  email: null,
  isLoggedIn: false,
  login: (email,token) => {},
  logout: (email,token) => {},

});

export const ExpenseContextProvider = (props) => {
  const userEmail = localStorage.getItem("email");
  const [email, setEmail] = useState(userEmail);

  const intitialToken = localStorage.getItem("token");
  const [token, setToken] = useState(intitialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  
  const logoutHandler = (token, email) => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

const expensecontextVal = {
  token: token,
  email: email,
  isLoggedIn: userIsLoggedIn,
  login: loginHandler,
  logout:logoutHandler
};

return (
<ExpenseContext.Provider value={expensecontextVal}>
    {props.children}
</ExpenseContext.Provider>
)
}
export default ExpenseContext
