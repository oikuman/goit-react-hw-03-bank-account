import React from "react";
import PropTypes from "prop-types";
import css from "./TransactionHistory.module.css";

const TransactionLines = ({ transactions }) => {
  return transactions.map(({ id, type, amount, date }) => (
    <tr key={id}>
      <td>{type}</td>
      <td>{amount}$</td>
      <td>{date}</td>
    </tr>
  ));
};

const TransactionHistory = ({ transactions }) => (
  <table className={css.history}>
    <thead>
      <tr>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {/* {transactions ? <TransactionLines transactions={transactions} /> : <tr><td colSpan="3">No transactions yet</td></tr>} */}
      <TransactionLines transactions={transactions} />
    </tbody>
  </table>
);

TransactionLines.defaultProps = {
  transactions: []
};

TransactionLines.propTypes = {
  transactions: PropTypes.array
};

export default TransactionHistory;
