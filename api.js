import axios from "axios";

const BASE_URL = "https://expenses-tracker-app-5.onrender.com/api";

export const getConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`, // FIXED: backticks
    },
  };
};

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    return res.data;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
};

// GET EXPENSES
export const getExpenses = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/expenses`, getConfig(token));
    return res.data;
  } catch (err) {
    console.error("Get expenses error:", err.response?.data || err.message);
    throw err;
  }
};

// ADD EXPENSE
export const addExpense = async (expense, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/expenses`, expense, getConfig(token));
    return res.data;
  } catch (err) {
    console.error("Add expense error:", err.response?.data || err.message);
    throw err;
  }
};