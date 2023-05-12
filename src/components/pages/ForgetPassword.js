import { useHistory } from "react-router-dom";
import { useState } from "react";

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
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDojO8XOD6X16-UnnK0TROT7GBKWxktAm4",
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
    <section className="px-2 my-20 pt-10 shadow-md rounded-lg text-center bg-black md:w-96 lg:w-1/2 md:mx-auto sm:mx-4 lg:mx-auto">
      <form onSubmit={newPasswordHandler} className="max-w-lg mx-auto">
        <p className="text-3xl text-white mb-4 font-bold ">
          Enter the Email with which you registered
        </p>
        <div className="mb-6 mx-4">
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={emailHandler}
            value={email}
            required
            className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center justify-between flex-wrap">
          {!isLoading && (
            <button
              type="submit"
              className="mb-10 bg-cyan-600 hover:bg-cyan-900 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue"
            >
              Send Link
            </button>
          )}
          {isLoading && <p>Sending request...</p>}
          <p
            type="button"
            onClick={backToLoginHandler}
            className="mb-10 text-gray-600 hover:text-gray-100 cursor-pointer mt-4 md:mt-0"
          >
            Back to Login
          </p>
        </div>
      </form>
    </section>
  );
};

export default ForgetPassword;
