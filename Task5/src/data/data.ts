import { type BaseExpense } from '../type/type';
const key = 'expenses';

export const getExpenses = (): BaseExpense[] => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const saveExpenses = (expenses: BaseExpense[]) => {
  localStorage.setItem(key, JSON.stringify(expenses));
};
export const addExpense = (expense: BaseExpense) => {
  const expenses = getExpenses();
  expenses.push(expense);
  saveExpenses(expenses);
};
