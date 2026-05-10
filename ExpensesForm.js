import React, { useState } from "react";
import axios from "axios";

const ExpensesForm = ({ fetchExpenses }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/expenses", {
        title,
        amount,
        category,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTitle("");
      setAmount("");
      setCategory("");
      fetchExpenses(); // update frontend totals & list
    } catch (err) {
      console.error("Add expense error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
      <input type="number" value={amount} placeholder="Amount" onChange={(e) => setAmount(e.target.value)} required />
      <input type="text" value={category} placeholder="Category" onChange={(e) => setCategory(e.target.value)} required />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpensesForm;