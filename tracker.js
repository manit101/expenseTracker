let expenses = [];
let totalIncome = 0;
let totalExpense = 0;

const categorySelect = document.getElementById('category-select');
const statusSelect = document.getElementById('status-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalIncomeCell = document.getElementById('total-income');
const totalExpenseCell = document.getElementById('total-expense');
const netBalanceCell = document.getElementById('net-balance');

totalIncomeCell.textContent = totalIncome;
totalExpenseCell.textContent = totalExpense;
netBalanceCell.textContent = totalIncome - totalExpense;
netBalanceCell.style.color = 'green';

categorySelect.addEventListener('change', function () {
    const isExpense = categorySelect.value !== 'Income';
    statusSelect.disabled = !isExpense;
    if (!isExpense) {
        statusSelect.value = '-';
    }
});

addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;
    const status = category !== 'Income' ? statusSelect.value : '-';

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (!date) {
        alert('Please select a date');
        return;
    }

    const transaction = { category, amount, date, status };
    expenses.push(transaction);

    if (category === 'Income') {
        totalIncome += amount;
    } else {
        totalExpense += amount;
    }

    const netBalance = totalIncome - totalExpense;

    totalIncomeCell.textContent = totalIncome.toFixed(2);
    totalExpenseCell.textContent = totalExpense.toFixed(2);
    netBalanceCell.textContent = netBalance.toFixed(2);
    netBalanceCell.style.color = netBalance >= 0 ? 'green' : 'red';

    const newRow = expensesTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const statusCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    categoryCell.textContent = transaction.category;
    amountCell.textContent = transaction.amount.toFixed(2);
    dateCell.textContent = transaction.date;
    statusCell.textContent = transaction.status;

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        expenses.splice(expenses.indexOf(transaction), 1);

        if (category === 'Income') {
            totalIncome -= amount;
        } else {
            totalExpense -= amount;
        }

        const updatedNetBalance = totalIncome - totalExpense;

        totalIncomeCell.textContent = totalIncome.toFixed(2);
        totalExpenseCell.textContent = totalExpense.toFixed(2);
        netBalanceCell.textContent = updatedNetBalance.toFixed(2);
        netBalanceCell.style.color = updatedNetBalance >= 0 ? 'green' : 'red';

        expensesTableBody.removeChild(newRow);
    });

    deleteCell.appendChild(deleteBtn);
});
