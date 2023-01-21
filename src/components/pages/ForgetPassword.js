import { useHistory } from "react-router-dom";
import { useState } from "react";
import classes from "./ForgetPassword.module.css";

const ForgetPassword = () => {
  
  const history = useHistory();

  const [email, setemail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailHandler = (e) => {
    setemail(e.target.value);
  };

  const newPasswordHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const passwordReset = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCgUOqeNyJVmp0BGn8K4bpRLeN4pcRNwPk",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await passwordReset.json();
    setIsLoading(false);
    if (passwordReset.ok) {
      console.log(data);
    } else {
      alert(data.error.message);
    }
  };

  const backToLoginHandler = () => {
    history.replace("/");
  };
  return (
    <section className={classes.verify}>
      <form onSubmit={newPasswordHandler}>
        <p>entered the email with which you have registered</p>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="email"
            onChange={emailHandler}
            value={email}
            required
          />
        </div>
        <br />
        {!isLoading && <button type="submit">send link</button>}
        <p type="button" onClick={backToLoginHandler}>
          already a user? Login
        </p>
        {isLoading && <p>Sending request...</p>}
      </form>
    </section>
  );
};

export default ForgetPassword;
