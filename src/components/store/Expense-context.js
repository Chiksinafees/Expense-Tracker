import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { expenseActions } from "./ExpenseStore";

const ExpenseContext = React.createContext({
  postData: () => {},
  getData: () => {},
  delete: (id) => {},
  edit: (array) => {},
});

export const ExpenseContextProvider = (props) => {

const loggedEmail=useSelector((currState)=>currState.auth.email)
  const dispatch = useDispatch();

  const postDataHandler = (obj) => {
    const postExpense = async (obj) => {
      const post = await fetch(
        `https://expense-975c9-default-rtdb.firebaseio.com/Expenses/${loggedEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            moneySpent: obj.moneySpent,
            description: obj.description,
            category: obj.category,
            email: obj.email,
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

  const getDataHandler = () => {
    const getRealTimeData = async () => {
      try {
        const get = await fetch(
          `https://expense-975c9-default-rtdb.firebaseio.com/Expenses/${loggedEmail}.json`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await get.json();
        let newArray = [];
        if (!!data) {
          newArray = Object.keys(data).map((exp) => {
            return {
              id: exp,
              moneySpent: data[exp].moneySpent,
              description: data[exp].description,
              category: data[exp].category,
              email: data[exp].email,
            };
          });
        }
        const totalSpent = newArray.reduce((currNumber, exp) => {
          return currNumber + Number(exp.moneySpent);
        }, 0);
          dispatch(
            expenseActions.addExpense({
              newArray: newArray,
              totalSpent: totalSpent,
            })
          );
      } catch (err) {
        alert(err.message);
      }
    };
    getRealTimeData();
  };

  useEffect(() => {
    getDataHandler();
  }, [getDataHandler]);

  const deleteHandler = (id) => {
    const deleteExp = async (id) => {
      try {
        const del = await fetch(
          `https://expense-975c9-default-rtdb.firebaseio.com/Expenses/${loggedEmail}/${id}.json`,
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
    postData: postDataHandler,
    getData: getDataHandler,
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
