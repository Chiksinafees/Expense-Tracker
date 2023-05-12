import classes from "./Header.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/AuthStore";
import { useState } from "react";
import { themeActions } from "./store/ThemeStore";
import exp from "../assets/exp.jpg";
const Header = () => {
  const dispatch = useDispatch();

  const totalSpent = useSelector((currState) => currState.exp.totalSpent);
  const isLoggedIn = useSelector((currState) => currState.auth.isLoggedIn);
  const expense = useSelector((currState) => currState.exp.expense);

  const [toggleButton, setToggleButton] = useState(false);
  const [darkLight, setDarkLight] = useState(true);
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("./");
  };

  const changStyleHandler = () => {
    setToggleButton((prevState) => !prevState);
  };

  const switchThemeHandler = () => {
    setDarkLight((prevState) => !prevState);

    if (darkLight) {
      dispatch(themeActions.darkHandler("black"));
    } else {
      dispatch(themeActions.lightHandler("grey"));
    }
  };

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);

    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvent);
    a.remove();
  };

  const downloadExpenseHandler = () => {
    console.log(expense);

    const heading = ["moneySpent,description,category"];

    let userCsv = expense.reduce((newArr, exp) => {
      const { moneySpent, description, category } = exp;
      newArr.push([moneySpent, description, category].join(","));
      return newArr;
    }, []);

    downloadFile({
      data: [...heading, ...userCsv].join("\n"),
      fileName: "expenses.csv",
      fileType: "text/csv",
    });
  };

  return (
    <header
      style={{
        backgroundImage: `url(${exp})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        minHeight: "12vh",
      }}
      className="bg-gray-400 p-6 mt-0 flex flex-col sm:flex-row justify-between items-center"
    >
      <h1 className="text-4xl font-bold mb-4 sm:mb-0 text-white">
        Expense Tracker
      </h1>
      <nav className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <ul className="flex flex-col sm:flex-row">
          <li>
            <button
              className="text-white bg-yellow-400 hover:bg-yellow-600 px-4 py-2 mr-2 rounded"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </li>
          <li>
            {totalSpent > 10000 && isLoggedIn && (
              <button
                className="text-white bg-green-500 hover:bg-green-800 px-4 py-2 rounded mr-2"
                onClick={changStyleHandler}
              >
                Active premium button
              </button>
            )}
          </li>
          <li>
            {totalSpent > 10000 && isLoggedIn && toggleButton && (
              <button
                className="text-white bg-purple-500  hover:bg-purple-900  px-4 py-2 mr-2 rounded"
                type="submit"
                onClick={switchThemeHandler}
              >
                {darkLight ? "dark button" : "light button"}
              </button>
            )}
          </li>
          <li>
            {totalSpent > 10000 && isLoggedIn && toggleButton && (
              <button
                className="text-white bg-indigo-500  hover:bg-indigo-900 px-4 py-2 rounded"
                type="submit"
                onClick={downloadExpenseHandler}
              >
                Download Expense
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
