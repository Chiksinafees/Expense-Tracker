import classes from "./App.css";
import React, { Fragment, Suspense } from "react";
import { Route } from "react-router-dom";
import exp from "././assets/exp.jpg";
import Footer from "./components/pages/Footer";
//import DummyScreen from "./components/pages/DummyScreen";
//import EmailVerification from "./components/pages/EmailVerification";
//import ForgetPassword from "./components/pages/ForgetPassword";
//import CompleteProfile from "./components/pages/CompleteProfile";
import ExpenseForm from "./components/signup/ExpenseForm";
import DailyExpense from "./components/pages/DailyExpense";
import Header from "./components/Header";

const DummyScreen = React.lazy(() => import("./components/pages/DummyScreen"));
const EmailVerification = React.lazy(() =>
  import("./components/pages/EmailVerification")
);
const ForgetPassword = React.lazy(() =>
  import("./components/pages/ForgetPassword")
);
const CompleteProfile = React.lazy(() =>
  import("./components/pages/CompleteProfile")
);

function App() {
  return (
    <Fragment>
      <Header />
      <Route path="/" exact>
        <ExpenseForm />
      </Route>
      <Suspense fallback={<h1 className={classes.textttt}>loading...</h1>}>
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
      </Suspense>
      <Route path="/DailyExpense" exact>
        <DailyExpense />
      </Route>
      <Footer />
    </Fragment>
  );
}

export default App;
