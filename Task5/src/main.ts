import { type Expense } from './type/type';
import { getExpenses, addExpense } from './data/data';

const Expense1: Expense = {
  id: '4',
  title: 'Electricity Bill',
  amount: 5000,
  category: 'Bills',
  date: `${new Date().getDate()}`,
};
addExpense(Expense1);
console.log(getExpenses());
