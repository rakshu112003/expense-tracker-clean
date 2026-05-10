import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const API = 'https://expenses-tracker-app-5.onrender.com/api/expenses';

  // FETCH
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
      alert("Fetch Error");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ADD + UPDATE
  const handleSubmit = async () => {
    if (!title || !amount || !category) {
      alert("Fill all fields");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      if (editId !== null) {
        // ✅ UPDATE
        await axios.put(`${API}/${editId}`, {
          title,
          amount: Number(amount),
          category,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Updated successfully");
        setEditId(null);
      } else {
        // ✅ ADD
        await axios.post(API, {
          title,
          amount: Number(amount),
          category,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Added successfully");
      }
      await fetchExpenses(); // 🔥 refresh
      setTitle("");
      setAmount("");
      setCategory("");
    } catch (err) {
      console.log(err);
      alert("Error saving data");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Deleted successfully");
      fetchExpenses();
    } catch (err) {
      console.log(err);
      alert("Delete error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔥 Expense Dashboard</h1>
      <h2>{editId !== null ? "Edit Expense" : "Add Expense"}</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {editId !== null ? "Update" : "Add"}
      </button>
      <hr />
      <h2>Expenses List</h2>
      {expenses.length === 0 && <p>No expense found</p>}
      {expenses.map((e) => (
        <div key={e._id} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }} >
          <p> {e.title} - ₹{e.amount} ({e.category}) </p>
          <button onClick={() => { setEditId(e._id); setTitle(e.title); setAmount(e.amount); setCategory(e.category); }} >
            Edit
          </button>
          <button onClick={() => handleDelete(e._id)} style={{ marginLeft: "10px" }} >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;