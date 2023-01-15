import { Fragment } from "react";
import { Route } from "react-router-dom";
import DummyScreen from "./components/pages/DummyScreen";
import ExpenseForm from "./components/signup/ExpenseForm";
//import Header from "./components/Header/Header";
import CompleteProfile from "./components/pages/CompleteProfile";
import EmailVerification from "./components/pages/EmailVerification";
import ForgetPassword from "./components/pages/ForgetPassword";

function App() {
  return (
    <Fragment >
   <Route path="/" exact>
        <ExpenseForm />
      </Route>   
        <Route path="/DummyScreen" exact>
        <DummyScreen />
      </Route>
      <Route path="/CompleteProfile" exact>
        <CompleteProfile />
      </Route>
      <Route path="/EmailVerification" exact>
        <EmailVerification />
      </Route>
      <Route path="/ForgetPassword" exact>
        <ForgetPassword />
      </Route>
    </Fragment>
  );
}

export default App;
