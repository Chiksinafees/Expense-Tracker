import React, { useEffect, useState } from "react";

const ExpenseContext = React.createContext({
  token: null,
  email: null,
  isLoggedIn: false,
  login: (email, token) => {},
  logout: (email, token) => {},

  postData: () => {},
  getData: () => {},
  delete: (id) => {},
  expenses: null,
  edit: (array) => {},
});

export const ExpenseContextProvider = (props) => {

  const userEmail = localStorage.getItem("email");
  const [email, setEmail] = useState(userEmail);

  const intitialToken = localStorage.getItem("token");
  const [token, setToken] = useState(intitialToken);

  const [expenses, setExpenses] = useState([]);
  const userIsLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logoutHandler = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const postDataHandler = (obj) => {

    const postExpense = async (obj) => {
      const post = await fetch(
        "https://expense-975c9-default-rtdb.firebaseio.com/Expenses.json",
        {
          method: "POST",
          body: JSON.stringify({
            moneySpent: obj.moneySpent,
            description: obj.description,
            category: obj.category,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await post.json();
      console.log(data);
      getDataHandler();
    };
    postExpense(obj);
  };

  let newArray = [];
  const getDataHandler = () => {
    const getRealTimeData = async () => {
      try {
        const get = await fetch(
          "https://expense-975c9-default-rtdb.firebaseio.com/Expenses.json",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await get.json();
        if (!!data) {
          newArray = Object.keys(data).map((exp) => {
            return {
              id: exp,
              moneySpent: data[exp].moneySpent,
              description: data[exp].description,
              category: data[exp].category,
            };
          });
        }
        setExpenses(newArray);
      } catch (err) {
        alert(err.message);
      }
    };
    getRealTimeData();
  };

  useEffect(() => {
    getDataHandler();
  }, []);

  const deleteHandler = (id) => {
    const deleteExp = async (id) => {
      try {
        const del = await fetch(
          `https://expense-975c9-default-rtdb.firebaseio.com/Expenses/${id}.json`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await del.json();
        getDataHandler();
      } catch (err) {
        alert(err.message);
      }
    };
    deleteExp(id);
  };

  const editHandler = (array) => {
    deleteHandler(array.id);
  };

  const expensecontextVal = {
    token: token,
    email: email,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,

    postData: postDataHandler,
    getData: getDataHandler,
    expenses: expenses,
    delete: deleteHandler,
    edit: editHandler,
  };

  return (
    <ExpenseContext.Provider value={expensecontextVal}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContext;
