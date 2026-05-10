import React from "react";

const ExpenseList = ({ expenses }) => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Amount</th>
        <th>Category</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {expenses.map((e) => (
        <tr key={e._id}>
          <td>{e.title}</td>
          <td>{e.amount}</td>
          <td>{e.category}</td>
          <td>{new Date(e.createdAt).toLocaleDateString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ExpenseList;