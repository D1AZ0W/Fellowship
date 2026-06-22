import { type BaseExpense } from '../type/type';
const key = 'expenses';

export const getExpenses = (): BaseExpense[] => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const addExpense = (expense: BaseExpense) => {
  const expenses = getExpenses();
  expenses.push(expense);
  localStorage.setItem(key, JSON.stringify(expenses));
};
