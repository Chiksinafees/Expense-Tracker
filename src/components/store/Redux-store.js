import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./AuthStore"
import expenseReducer from "./ExpenseStore"



const store=configureStore({
    reducer:{auth:authReducer,
              exp:expenseReducer}
})


export default store


