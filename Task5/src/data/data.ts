import type { BaseExpense } from "../type/type";

const key = "expenses";

export function getExpenses(): BaseExpense[] {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

export function addExpense(expense: BaseExpense) {
  const expenses = getExpenses();
  expenses.push(expense);
  localStorage.setItem(key, JSON.stringify(expenses));
}
