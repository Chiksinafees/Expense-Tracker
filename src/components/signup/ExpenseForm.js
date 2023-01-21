import { useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./ExpenseForm.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthStore";


const ExpenseForm = () => {

  const dispatch=useDispatch()

 //const emailId=useSelector((currState)=>currState.auth.email)
 //const tokenNum=useSelector((currState)=>currState.auth.token)
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const history = useHistory();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandle = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      password.length >= 8 &&
      confirmPassword.length >= 8 &&
      password === confirmPassword
    ) {
      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgUOqeNyJVmp0BGn8K4bpRLeN4pcRNwPk";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgUOqeNyJVmp0BGn8K4bpRLeN4pcRNwPk";
      }

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        Headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed";
              if (data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          if (isLogin) {
            console.log(data.idToken);
            const regex = /[.@]/g;
            const emailId = data.email.replace(regex, "");
            //expCtx.login(data.idToken, emailId);
           dispatch(authActions.login({emailId:emailId,token:data.idToken}))
            history.replace("/DailyExpense");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      if (password !== confirmPassword) {
        alert("password and confirm password did not match");
      } else if (password.length <= 8 && confirmPassword.length <= 8) {
        alert("please enter atleast 8 digit");
      }
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const switchAuthHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const forgetPasswordHandler = () => {
    history.replace("/ForgetPassword");
  };
  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={submitHandler}>
          <h1>{isLogin ? "login" : "sign up"}</h1>
          <div className={classes.control}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={emailHandler}
              value={email}
              required
            />
            <input
              type="text"
              id="password"
              placeholder="Password"
              onChange={passwordHandler}
              value={password}
              required
            />
            <input
              type="password"
              id="Confirm password"
              placeholder="Confirm Password"
              onChange={confirmPasswordHandle}
              value={confirmPassword}
              required
            />
          </div>
          <div>
            <p type="button" onClick={forgetPasswordHandler}>
              forgot password ?
            </p>
            <button type="submit">{isLogin ? "login" : "Sign up"}</button>
            <br />
            <h4 type="button" onClick={switchAuthHandler}>
              {isLogin
                ? "Don't have an account?sign up"
                : "already have an account? login"}
            </h4>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ExpenseForm;
