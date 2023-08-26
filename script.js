const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");

// Initialize expenses from local storage or set an empty array
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Display expenses on the page
function displayExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense, index) => {
        const expenseItem = document.createElement("div");
        expenseItem.className = "expense-item";
        expenseItem.innerHTML = `
            <span>${expense.name}</span>
            <span>$${expense.amount}</span>
            <button onclick="removeExpense(${index})">Remove</button>
        `;
        expenseList.appendChild(expenseItem);
    });
}

// Add new expense
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const expenseName = document.getElementById("expense-name").value;
    const expenseAmount = parseFloat(document.getElementById("expense-amount").value);
    if (expenseName && !isNaN(expenseAmount)) {
        expenses.push({ name: expenseName, amount: expenseAmount });
        localStorage.setItem("expenses", JSON.stringify(expenses));
        displayExpenses();
        expenseForm.reset();
    }
});

// Remove expense
function removeExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}

// Initial display of expenses
displayExpenses();
