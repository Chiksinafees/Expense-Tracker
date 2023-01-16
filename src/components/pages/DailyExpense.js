import { Fragment, useEffect, useState } from "react";

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

  const formSubmitHnadler = async (e) => {
    e.preventDefault();
    setArr([
      ...arr,
      { moneySpent: moneySpent, description: description, category: category },
    ]);

    const post = await fetch(
      "https://expense-975c9-default-rtdb.firebaseio.com/Expenses.json",
      {
        method: "POST",
        body: JSON.stringify({
          moneySpent: moneySpent,
          description: description,
          category: category,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await post.json();
    console.log(data);
    setMoneySpent("");
    setDescription("");
    setCategory("");
  };

  useEffect(() => {
    const getRealTimeData = async () => {
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
      console.log(data);
      if (get.ok) {
        const getArray = Object.keys(data).map((exp) => {
          return {
            id: exp,
            moneySpent: data[exp].moneySpent,
            description: data[exp].description,
            category: data[exp].category,
          };
        });
        setArr(getArray);
      } else {
        alert(data.error.message);
      }
    };
    getRealTimeData();
  }, []);

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
            moneySpent: {array.moneySpent} , description: {array.description} ,
            category: {array.category} ,
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default DailyExpense;
