
import { createSlice } from "@reduxjs/toolkit";

const expenseState = {
  expense:[], totalSpent:0
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: expenseState,
  reducers: {
    addExpense(currState, action) {
     currState.expense = action.payload.newArray;
     currState.totalSpent=action.payload.totalSpent
    }
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;

