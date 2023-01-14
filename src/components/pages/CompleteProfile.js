import { useState } from "react";
import { Fragment } from "react";
import ExpenseContext from "../store/Expense-context";
import { useContext } from "react";

const CompleteProfile = () => {
  const comCtx = useContext(ExpenseContext);
  const idToken = comCtx.token;
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const urlHandler = (e) => {
    setPhotoUrl(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCgUOqeNyJVmp0BGn8K4bpRLeN4pcRNwPk",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          displayName: name,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }),
        headers: {
            "Content-Type": "application/json",
          },
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      setName("");
      setPhotoUrl("");
    }
    else{
        alert(data.error.message)
    }
  };
  return (
    <Fragment>
      <div>
        <p>Winners never quite,quitters never won</p>
      </div>

      <form onSubmit={formSubmitHandler}>
        <h4>Contact Details</h4>
        <label htmlFor="full name">Full Name:</label>
        <input
          type="text"
          id="full name"
          onChange={nameHandler}
          value={name}
          required
        />
        <label htmlFor="profile photo URL">Profile Photo URL:</label>
        <input
          type="url"
          id="profile photo URL"
          onChange={urlHandler}
          value={photoUrl}
          required
        />
        <button type="submit">update</button>
      </form>
    </Fragment>
  );
};

export default CompleteProfile;
