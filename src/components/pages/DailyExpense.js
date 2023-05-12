import { useState, useContext } from "react";
import ExpenseContext from "../store/Expense-context";
import { useSelector } from "react-redux";

const DailyExpense = () => {
  const expense = useSelector((currState) => currState.exp.expense);

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
      email: localStorage.getItem("email"),
    };
    dailyExpCtx.postData(obj);

    setMoneySpent("");
    setDescription("");
    setCategory("");
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
    <main className="p-6 md:p-12 lg:p-20 ">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold p-4 flex justify-center bg-purple-500 to-pink-500 rounded mb-4">
          Daily Expenses
        </h1>
        <form
          onSubmit={formSubmitHnadler}
          className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4"
        >
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <input
              type="number"
              id="money spent"
              placeholder="money spent"
              onChange={moneySpentHandler}
              value={moneySpent}
              required
              className="px-4 py-2 rounded-md border-gray-400 focus:outline-none focus:border-blue-500 w-full md:w-48"
            />
            <input
              type="text"
              id="description"
              placeholder="description"
              onChange={descriptionHandler}
              value={description}
              required
              className="px-4 py-2 rounded-md border-gray-400 focus:outline-none focus:border-blue-500 w-full md:w-96"
            />
            <select
              value={category}
              onChange={categoryHandler}
              className="w-full md:w-48 px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option disabled value="">
                Select
              </option>
              <option value="food">Food</option>
              <option value="petrol">Petrol</option>
              <option value="salary">Salary</option>
            </select>

            <button
              type="submit"
              className="text-white bg-cyan-600 px-4 py-2 rounded-md shadow-md hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              submit
            </button>
          </div>
        </form>
        <ul className="mt-8 space-y-4">
          {expense.map((array) => (
            <li
              key={array.id + array.moneySpent + array.description}
              className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4"
            >
              <div className="bg-gray-200 px-4 py-2 rounded-md">
                <span className="text-gray-700 font-bold">moneySpent:</span> ₹
                {array.moneySpent}
              </div>
              <div className="bg-gray-200 px-4 py-2 rounded-md">
                <span className="text-gray-700 font-bold">description:</span>{" "}
                {array.description}
              </div>
              <div className="bg-gray-200 px-4 py-2 rounded-md">
                <span className="text-gray-700 font-bold">category:</span>{" "}
                {array.category}
              </div>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <button
                  onClick={deleteHandler.bind(null, array.id)}
                  className="text-white bg-red-800 px-4 py-2 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                >
                  delete
                </button>
                <button
                  onClick={editHandler.bind(null, array)}
                  className="text-white bg-green-800 px-4 py-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                >
                  edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default DailyExpense;
