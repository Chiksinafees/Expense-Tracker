import { useHistory } from "react-router-dom";
import ExpenseContext from "../store/Expense-context";
import { useContext } from "react";
import classes from "./ForgetPassword.module.css";

const EmailVerification = () => {
  const history = useHistory();
  const emailCtx = useContext(ExpenseContext);
  const idToken = emailCtx.token;
  const emailVerificationHandler = async (e) => {
    e.preventDefault();

    const verify = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDojO8XOD6X16-UnnK0TROT7GBKWxktAm4",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await verify.json();
    if (verify.ok) {
      console.log(data);
    } else {
      alert(data.error.message);
    }
    history.replace("/DummyScreen");
  };
  return (
    <main className={classes.verify}>
      <section>
        <form onSubmit={emailVerificationHandler}>
          <h1>Verify Your Email</h1>
          <p>
            we've sent an email to ----- to verify your email address and
            activate your expense tracker.
          </p>
          <button type="submit">Verify your Email</button>
        </form>
      </section>
    </main>
  );
};
export default EmailVerification;
