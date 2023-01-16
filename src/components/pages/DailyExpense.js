import { Fragment, useState } from "react";

const DailyExpense = () => {
  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [arr, setArr] = useState([]);

  const moneySpentHandler = (e) => {
    setMoneySpent(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const formSubmitHnadler = (e) => {
    e.preventDefault();
    setArr([
      ...arr,
      { moneySpent: moneySpent, description: description, category: category },
    ]);

    setMoneySpent("");
    setDescription("");
    setCategory("");
  };
  return (
    <Fragment>
      <form onSubmit={formSubmitHnadler}>
        <h1>Daily Expenses</h1>
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
        <button type="submit">submit</button>
      </form>
      <ul>
        {arr.map((array) => (
          <li key={array.money + array.description}>
            moneySpent: {array.moneySpent}
            description: {array.description}
            category: {array.category}
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default DailyExpense;
