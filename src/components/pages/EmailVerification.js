import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import ExpenseContext from "../store/Expense-context";
import { useContext } from "react";

const EmailVerification = () => {

    const history=useHistory()
     const emailCtx=useContext(ExpenseContext)
    const idToken=emailCtx.token
    const emailVerificationHandler= async(e)=>{
e.preventDefault()

const verify = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCgUOqeNyJVmp0BGn8K4bpRLeN4pcRNwPk",
    {
      method: "POST",
      body: JSON.stringify({
        requestType:"VERIFY_EMAIL",
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
   history.replace('/DummyScreen')
    }
  return (
    <Fragment>
        <form onSubmit={emailVerificationHandler}>
      <h1>Verify Your Email</h1>
      <p>
        we've sent an email to ----- to verify your email address and activate
        your expense tracker.
      </p>
      <button type="submit">Verify your Email</button>
      </form>
    </Fragment>
  );
};
export default EmailVerification;
