import React, { Component } from 'react';
import v4 from 'uuid/v4';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Controls from '../Controls';
import Balance from '../Balance';
import TransactionHistory from '../TransactionHistory';
import css from './Dashboard.module.css';

class Dashboard extends Component {
  state = {
    income: 0,
    expense: 0,
    balance: 0,
    transactions: [],
  };

  getIncome = storedTransactions => {
    return storedTransactions.reduce((acc, transaction) => {
      if (transaction.type === 'Deposit') return (acc += transaction.amount);
      return acc;
    }, 0);
  };

  getExpense = storedTransactions => {
    return storedTransactions.reduce((acc, transaction) => {
      if (transaction.type === 'Withdrawal') return (acc += transaction.amount);
      return acc;
    }, 0);
  };

  componentDidMount = () => {
    toast.configure();
    const storedValue = localStorage.getItem('transactions');
    const valueParsed = JSON.parse(storedValue);
    const storedArr = valueParsed || [];
    const transIncome = this.getIncome(storedArr);
    const transExpense = this.getExpense(storedArr);

    this.setState({
      income: transIncome,
      expense: transExpense,
      balance: transIncome - transExpense,
      transactions: storedArr,
    });
  };

  notify = message => toast(message);

  handleDeposit = e => {
    const amount = Number(e.target.parentElement.firstElementChild.value);
    e.target.parentElement.firstElementChild.value = '';
    if (amount) {
      const transaction = {
        id: v4(),
        type: 'Deposit',
        amount,
        date: new Date().toLocaleString('uk'),
      };

      this.setState(prevState => ({
        income: (prevState.income += amount),
        balance: (prevState.balance += amount),
        transactions: [...prevState.transactions, transaction],
      }));
      const { transactions } = this.state;
      const allTransactions = [...transactions, transaction];
      localStorage.setItem('transactions', JSON.stringify(allTransactions));
    } else {
      this.notify('Please enter amount');
    }
  };

  handleWithdraw = e => {
    const amount = Number(e.target.parentElement.firstElementChild.value);
    e.target.parentElement.firstElementChild.value = '';
    if (amount) {
      const { balance } = this.state;
      if (amount > balance) {
        this.notify('Not enough funds on your acoount');
        return;
      }
      const transaction = {
        id: v4(),
        type: 'Withdrawal',
        amount,
        date: new Date().toLocaleString('uk'),
      };
      this.setState(prevState => ({
        expense: (prevState.expense += amount),
        balance: (prevState.balance -= amount),
        transactions: [...prevState.transactions, transaction],
      }));
      const { transactions } = this.state;
      const allTransactions = [...transactions, transaction];
      localStorage.setItem('transactions', JSON.stringify(allTransactions));
    } else {
      this.notify('Please enter amount');
    }
  };

  render() {
    const { income, expense, balance, transactions } = this.state;

    return (
      <div className={css.dashboard}>
        <Controls
          handleDeposit={this.handleDeposit}
          handleWithdraw={this.handleWithdraw}
        />
        <Balance income={income} expense={expense} balance={balance} />
        <TransactionHistory transactions={transactions} />
      </div>
    );
  }
}

export default Dashboard;
