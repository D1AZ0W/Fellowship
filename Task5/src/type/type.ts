export type Category = 'Food' | 'Entertainment' | 'Groceries' | 'Bills';

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;
};
