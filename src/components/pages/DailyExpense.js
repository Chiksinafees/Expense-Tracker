import { useState, useContext } from "react";
import ExpenseContext from "../store/Expense-context";
import classes from "./DailyExpense.module.css";
import { useSelector } from "react-redux";


const DailyExpense = () => {

  const expense=useSelector((currState)=>currState.exp.expense)

  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const dailyExpCtx = useContext(ExpenseContext);

  const moneySpentHandler = (e) => {
    setMoneySpent(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const formSubmitHnadler = async (e) => {
    e.preventDefault();
    const obj = {
      moneySpent: moneySpent,
      description: description,
      category: category,
    };
    dailyExpCtx.postData(obj);
  };

  const deleteHandler = (deleteExpId) => {
    dailyExpCtx.delete(deleteExpId);
  };

  const editHandler = (array) => {
    //console.log(array)
    setMoneySpent(array.moneySpent);
    setDescription(array.description);
    setCategory(array.category);
    dailyExpCtx.edit(array);
  };

  return (
    <main className={classes.expense}>
      <section>
        <form onSubmit={formSubmitHnadler}>
          <h1>Daily Expenses</h1>
          <div className={classes.control}>
            <input
              type="number"
              id="money spent"
              placeholder="money spent"
              onChange={moneySpentHandler}
              value={moneySpent}
              required
            />
            <input
              type="text"
              id="description"
              placeholder="description"
              onChange={descriptionHandler}
              value={description}
              required
            />
            <select value={category} onChange={categoryHandler}>
              <option>select</option>
              <option value="food">food</option>
              <option value="petrol">petrol</option>
              <option value="salary">salary</option>
            </select>
          </div>
          <div>
            <button type="submit">submit</button>
          </div>
        </form>
        <ul>
          {expense.map((array) => (
            <li key={array.id + array.moneySpent + array.description}>
              moneySpent: {array.moneySpent} , description: {array.description}{" "}
              , category: {array.category} ,
              <button onClick={deleteHandler.bind(null, array.id)}>
                delete
              </button>
              <button onClick={editHandler.bind(null, array)}>edit</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default DailyExpense;
