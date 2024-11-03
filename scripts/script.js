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

const updateBudget = () => {
    let total = 0;
    for (const trans of transactions) {
        total += trans.amount;
    }
    totalBudget.textContent = total;
};

const displayTransactions = (filteredTransactions = transactions) => {
    transactionList.innerHTML = '';
    filteredTransactions.forEach(({ id, note, amount, type }) => {
        const li = document.createElement('li');
        li.classList.add('transaction-item', type);
        li.innerHTML = `
            ${note}: $${amount}
            <span>
                <button onclick="editTransaction('${id}')">Edit</button>
                <button onclick="deleteTransaction('${id}')">Delete</button>
            </span>
        `;
        transactionList.appendChild(li);
    });
};

transactionForm.addEventListener('submit', () => {
    
    const note = document.getElementById('transaction-note').value;
    const amount = +document.getElementById('transaction-amount').value;
    const type = document.getElementById('transaction-type').value;

    const transaction = { id: Date.now().toString(), note, amount: type === 'expense' ? -amount : amount, type };
    transactions.push(transaction);
    saveTransactions();
    updateBudget();
    displayTransactions();

    transactionForm.reset();
});

window.editTransaction = id => {
    const transaction = transactions.find(trans => trans.id === id);
    document.getElementById('transaction-note').value = transaction.note;
    document.getElementById('transaction-amount').value = Math.abs(transaction.amount);
    document.getElementById('transaction-type').value = transaction.type;
    deleteTransaction(id);
};

window.deleteTransaction = id => {
    transactions = transactions.filter(trans => trans.id !== id);
    saveTransactions();
    updateBudget();
    displayTransactions();
};

document.getElementById('filter-button').addEventListener('click', () => {
    const minAmount = document.getElementById('min-amount').value;
    const maxAmount = document.getElementById('max-amount').value;
    const filterType = document.getElementById('filter-type').value;

    const filtered = transactions.filter(({ amount, type }) => {
        const absAmount = Math.abs(amount);
        return (
            absAmount >= minAmount &&
            absAmount <= maxAmount &&
            (filterType === 'all' || type === filterType)
        );
    });

    displayTransactions(filtered);
});

updateBudget();
displayTransactions();
