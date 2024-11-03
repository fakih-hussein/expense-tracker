
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

transactionForm.addEventListener('submit', e => {
    
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