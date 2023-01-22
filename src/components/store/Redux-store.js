import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthStore";
import expenseReducer from "./ExpenseStore";
import ThemeReducer from "./ThemeStore";

const store = configureStore({
  reducer: { auth: authReducer, exp: expenseReducer, theme: ThemeReducer },
});

export default store;
