import { Fragment} from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const ForgetPassword = () => {

    const history = useHistory();

  const[email,setemail]=useState('')
  const[isLoading, setIsLoading]=useState(false)

  const emailHandler=(e)=>{
    setemail(e.target.value)
  }

  const newPasswordHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
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
    setIsLoading(false)
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
    <Fragment>
      <form onSubmit={newPasswordHandler}>
        <p>entered the email with which you have registered</p>
        <input
          type="email"
          id="email"
          placeholder="email"
          onChange={emailHandler}
          value={email}
          required
        />
        <br />
        {!isLoading && <button type="submit">send link</button>}
        <p type="button" onClick={backToLoginHandler}>
          already a user? Login
        </p>
        {isLoading && <p>Sending request...</p>}
      </form>
    </Fragment>
  );
};

export default ForgetPassword;
