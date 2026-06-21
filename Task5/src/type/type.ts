export type Category = 'Food' | 'Entertainment' | 'Groceries' | 'Bills';

export interface BaseExpense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;
}
