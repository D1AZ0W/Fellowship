import { type Expense } from '../type/type';
const key = 'expenses';

export const getExpenses = (): Expense[] => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const saveExpenses = (expenses: Expense[]) => {
  localStorage.setItem(key, JSON.stringify(expenses));
};
export const addExpense = (expense: Expense) => {
  const expenses = getExpenses();
  expenses.push(expense);
  saveExpenses(expenses);
};
