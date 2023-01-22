import classes from "./Header.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/AuthStore";
import { useState } from "react";
import { themeActions } from "./store/ThemeStore";

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
    <header className={classes.header}>
      <h1>Expense Tracker</h1>
      {
        <nav>
          <ul>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
            <li>
              {totalSpent > 10000 && isLoggedIn && (
                <button className="button" onClick={changStyleHandler}>
                  Active premium button
                </button>
              )}
            </li>
            <li>
              {totalSpent > 10000 && isLoggedIn && toggleButton && (
                <button type="submit" onClick={switchThemeHandler}>
                  {darkLight ? "dark button" : "light button"}
                </button>
              )}
            </li>
            <li>
              {totalSpent > 10000 && isLoggedIn && toggleButton && (
                <button type="submit" onClick={downloadExpenseHandler}>
                  Download Expense
                </button>
              )}
            </li>
          </ul>
        </nav>
      }
    </header>
  );
};

export default Header;
