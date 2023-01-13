import { Fragment, useState } from "react";

const ExpenseForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandle = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    if(password.length>=8 && confirmPassword.length>=8 && password===confirmPassword){
 const post=await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgUOqeNyJVmp0BGn8K4bpRLeN4pcRNwPk",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          Headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          console.log("User has successfully signed up");
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            if (data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
      });
    }
    setEmail("");
    setPassword("");
    setConfirmPassword('')
  };
  
  return (
    <Fragment>
        <form onSubmit={submitHandler}>
      <div>
        <h1 className="text-center">sign up</h1>
      </div>
      <div>
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
      
      <button>Sign up</button>
    </form>
    <div>
        <p>already have an account?<button>login</button></p>
      </div>
    </Fragment>
    
  );
};

export default ExpenseForm;
