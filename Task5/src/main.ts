import { getExpenses, addExpense } from './data/data';
import { type BaseExpense, type Category } from './type/type';

const categories: Category[] = ['Food', 'Entertainment', 'Groceries', 'Bills'];
const createBtn = document.getElementById('create') as HTMLButtonElement;
const useFilter = document.getElementById('useFilter') as HTMLSelectElement;
const calendar = document.getElementById('calendar') as HTMLInputElement;
const expenseTable = document.getElementById('expenseTable') as HTMLDivElement;
const details = document.getElementById('details') as HTMLDivElement;

const formatCurrency = (amount: number): string => `Rs. ${amount.toFixed(2)}`;

const getFilteredExpenses = (): BaseExpense[] => {
  const all = getExpenses();
  const category = useFilter.value;
  const date = calendar.value;
  return all.filter(
    (e) =>
      (category === '' || e.category == category) &&
      (date === '' || e.date == date),
  );
};

const renderTable = (expenses: BaseExpense[]) => {
  if (expenses.length === 0) {
    expenseTable.innerHTML = `<p class="text-slate-400 italic py-6 text-center">No expenses found.</p>`;
    return;
  }
  expenseTable.innerHTML = `
    <div class="overflow-x-auto rounded-2xl border border-slate-700 text-center">
      <table class="w-full">
        <thead class="bg-slate-700">
          <tr>
            <th class="p-3">Title</th>
            <th class="p-3">Amount</th>
            <th class="p-3">Category</th>
            <th class="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
        ${expenses
          .map(
            (e) => `
          <tr class="border border-slate-700">
            <td class="p-3">${e.title}</td>
            <td class="p-3">${formatCurrency(e.amount)}</td>
            <td class="p-3">${e.category}</td>
            <td class="p-3">${e.date}</td>
          </tr>
        `,
          )
          .join('')}
        </tbody>
      </table>
    </div>
  `;
};

const renderStatistics = (expenses: BaseExpense[]) => {
  if (expenses.length === 0) {
    details.innerHTML = `<p class="text-slate-400 italic py-4">No data yet.</p>`;
    return;
  }

  let total = 0;
  const categoryStats: Record<Category, number> = {
    Food: 0,
    Entertainment: 0,
    Groceries: 0,
    Bills: 0,
  };
  let highest = expenses[0];
  for (const expense of expenses) {
    total += expense.amount;
    categoryStats[expense.category] += expense.amount;
    if (expense.amount > highest.amount) {
      highest = expense;
    }
  }

  details.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-3">
      <div class="bg-slate-700 rounded-2xl p-4">
        <p class="font-semibold mb-2">Category Totals</p>
        <div class="flex flex-col p-2 border-slate-700 space-y-2">
          <div class="justify-between w-full flex">
            <span>Food:</span>
            <span>${formatCurrency(categoryStats.Food)}</span>
          </div>
          <div class="justify-between w-full flex">
            <span>Entertainment:</span>
            <span>${formatCurrency(categoryStats.Entertainment)}</span>
          </div>
          <div class="justify-between w-full flex">
            <span>Groceries:</span>
            <span>${formatCurrency(categoryStats.Groceries)}</span>
          </div>
          <div class="justify-between w-full flex">
            <span>Bills:</span>
            <span>${formatCurrency(categoryStats.Bills)}</span>
          </div>
        </div>
      </div>
      <div class="bg-slate-700 rounded-2xl p-4 space-y-2">
        <p class="font-semibold">Total Spent</p>
        <p class="text-2xl">${formatCurrency(total)}</p>
        <p class="font-semibold mt-4">Highest Expense</p>
        <p>${highest.title} - ${formatCurrency(highest.amount)} (${highest.category})</p>
      </div>
    </div>
  `;
};

const renderAll = () => {
  const filtered = getFilteredExpenses();
  renderTable(filtered);
  renderStatistics(filtered);
};

let modalEl: HTMLDivElement | null = null;
const closeModal = () => {
  if (modalEl) {
    modalEl.remove();
    modalEl = null;
  }
};

const openModal = () => {
  if (modalEl) return;
  modalEl = document.createElement('div');
  modalEl.className = 'fixed flex top-1/5 justify-center max-w-screen w-full';
  modalEl.innerHTML = `
    <div class="bg-slate-800 rounded-2xl p-6 w-full sm:w-1/2 lg:w-1/3 space-y-4">
      <h2 class="font-bold text-xl">Add Expense</h2>
      <form id="expenseForm" class="space-y-4">
        <div>
          <label class="block mb-1" for="title">Title</label>
          <input id="title" name="title" type="text" required class="w-full p-3 bg-slate-500 rounded" />
        </div>
        <div>
          <label class="block mb-1" for="amount">Amount</label>
          <input id="amount" name="amount" type="number" step="0.01" min="0" required class="w-full p-3 bg-slate-500 rounded" />
        </div>
        <div>
          <label class="block mb-1" for="category">Category</label>
          <select id="category" name="category" required class="w-full p-3 bg-slate-500 rounded cursor-pointer">
            ${categories.map((cat) => `<option value="${cat}">${cat}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block mb-1" for="date">Date</label>
          <input id="date" name="date" type="date" required class="w-full p-3 bg-slate-500 rounded cursor-pointer" />
        </div>
        <div class="flex gap-4 justify-end pt-2">
          <button type="button" id="cancelBtn" class="p-3 px-5 bg-slate-600 hover:bg-slate-700 rounded-2xl cursor-pointer">Cancel</button>
          <button type="submit" class="p-3 px-5 bg-blue-500 hover:bg-blue-700 rounded-2xl cursor-pointer">Save</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modalEl);
  const cancelBtn = document.getElementById('cancelBtn') as HTMLButtonElement;
  cancelBtn.addEventListener('click', closeModal);

  const expenseForm = document.getElementById('expenseForm') as HTMLFormElement;
  expenseForm.addEventListener('submit', handleFormSubmit);
};

const handleFormSubmit = (e: Event) => {
  e.preventDefault();
  const titleF = document.getElementById('title') as HTMLInputElement;
  const amountF = document.getElementById('amount') as HTMLInputElement;
  const categoryF = document.getElementById('category') as HTMLSelectElement;
  const dateInput = document.getElementById('date') as HTMLInputElement;

  const title = titleF.value.trim();
  const amount = Number(amountF.value);
  const category = categoryF.value as Category;
  const date = dateInput.value;

  if (!title || !amount || amount <= 0 || !date) {
    alert('Please fill all fields correctly');
    return;
  }

  const newExpense: BaseExpense = {
    id: Date.now().toString(),
    title,
    amount,
    category,
    date,
  };

  addExpense(newExpense);
  closeModal();
  renderAll();
  alert('Expense added successfully');
};

createBtn.addEventListener('click', openModal);
useFilter.addEventListener('change', renderAll);
calendar.addEventListener('change', renderAll);

renderAll();
