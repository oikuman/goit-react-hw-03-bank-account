import React from "react";
import PropTypes from "prop-types";
import css from "./Controls.module.css";

const Controls = ({ handleDeposit, handleWithdraw }) => (
  <section className={css.controls}>
    <input type="number" min="0" name="amount" />
    <button
      onClick={e => handleDeposit(e)}
      type="button"
      className={css.button}
    >
      Deposit
    </button>
    <button
      onClick={e => handleWithdraw(e)}
      type="button"
      className={css.button}
    >
      Withdraw
    </button>
  </section>
);

Controls.propTypes = {
  handleDeposit: PropTypes.func.isRequired,
  handleWithdraw: PropTypes.func.isRequired
};

export default Controls;
