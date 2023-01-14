import { Fragment } from "react";
import { Route } from "react-router-dom";
import DummyScreen from "./components/pages/DummyScreen";
import ExpenseForm from "./components/signup/ExpenseForm";
//import Header from "./components/Header/Header";

function App() {
  return (
    <Fragment >
   <Route path="/" exact>
        <ExpenseForm />
      </Route>   
        <Route path="/DummyScreen" exact>
        <DummyScreen />
      </Route>
    </Fragment>
  );
}

export default App;
