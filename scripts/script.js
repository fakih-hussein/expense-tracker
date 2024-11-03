
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalBudget = document.getElementById('total-budget');


let transactions = localStorage.getItem('transactions');
if (transactions) {
    transactions = JSON.parse(transactions);
} else {
    transactions = [];
}

const saveTransactions = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
};