import { type BaseExpense } from './type/type';
import { getExpenses, addExpense } from './data/data';

const Expense1: BaseExpense = {
  id: '3',
  title: 'BhatBhatini groceries',
  amount: 5000,
  category: 'Groceries',
  date: `${new Date().getDate()}`,
};
addExpense(Expense1);
console.log(getExpenses());
