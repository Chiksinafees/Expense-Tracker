import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthStore";

const ExpenseForm = () => {
  const dispatch = useDispatch();

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
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDojO8XOD6X16-UnnK0TROT7GBKWxktAm4";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDojO8XOD6X16-UnnK0TROT7GBKWxktAm4";
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
            dispatch(
              authActions.login({ emailId: emailId, token: data.idToken })
            );
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
    <main className="my-16 flex items-center justify-center mx-4">
      <section className="bg-black rounded-lg shadow-md p-8 w-full md:w-1/2 lg:w-1/3">
        <form onSubmit={submitHandler}>
          <h1 className="text-4xl mb-6 text-white text-center font-semibold">
            {isLogin ? "Login" : "Sign up"}
          </h1>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
              onChange={emailHandler}
              value={email}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
              onChange={passwordHandler}
              value={password}
              required
            />
            <input
              type="password"
              id="Confirm password"
              placeholder="Confirm Password"
              className="p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
              onChange={confirmPasswordHandle}
              value={confirmPassword}
              required
            />
          </div>
          <div className="flex flex-col items-start gap-4 mt-6">
            <p
              className="text-sm cursor-pointer text-blue-500"
              onClick={forgetPasswordHandler}
            >
              Forgot Password?
            </p>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"
            >
              {isLogin ? "Login" : "Sign up"}
            </button>
            <h4
              className="text-sm text-gray-500 cursor-pointer"
              onClick={switchAuthHandler}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </h4>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ExpenseForm;
