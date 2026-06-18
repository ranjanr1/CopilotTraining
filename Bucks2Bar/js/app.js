/* ── Pure Functions (exported for testing) ───────────────────────────────── */

function validateUsername(value) {
  if (value.length < 5)              return 'Username must be at least 5 characters.';
  if (!/[A-Z]/.test(value))          return 'Username must contain at least 1 uppercase letter.';
  if (!/[0-9]/.test(value))          return 'Username must contain at least 1 number.';
  if (!/[^A-Za-z0-9]/.test(value))   return 'Username must contain at least 1 special character.';
  return '';
}

/* ── Constants & State ───────────────────────────────────────────────────── */
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const income   = new Array(12).fill(0);
const expenses = new Array(12).fill(0);

/** Format a number as USD currency string */
const usd = value =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

/* ── DOM Initialization ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

/* ── Username Validation DOM ─────────────────────────────────────────────── */
const usernameInput   = document.getElementById('usernameInput');
const usernameError   = document.getElementById('usernameError');
const usernameSuccess = document.getElementById('usernameSuccess');
const usernameSection = document.getElementById('usernameSection');

function applyValidationResult(error) {
  if (error) {
    usernameInput.classList.add('is-invalid');
    usernameInput.classList.remove('is-valid');
    usernameError.textContent   = error;
    usernameSuccess.textContent = '';
  } else {
    usernameInput.classList.remove('is-invalid');
    usernameInput.classList.add('is-valid');
    usernameError.textContent   = '';
    usernameSuccess.textContent = `Username "${usernameInput.value}" accepted!`;
  }
}

usernameSection.addEventListener('submit', e => {
  e.preventDefault();
  applyValidationResult(validateUsername(usernameInput.value));
});

usernameInput.addEventListener('input', () => {
  if (usernameInput.classList.contains('is-invalid') || usernameInput.classList.contains('is-valid')) {
    applyValidationResult(validateUsername(usernameInput.value));
  }
});

/* ── Build Data Grid Rows ────────────────────────────────────────────────── */
const dataGrid = document.getElementById('dataGrid');
const firstFooterCell = dataGrid.querySelector('.data-grid-footer');

MONTHS.forEach((month, i) => {
  const monthDiv = document.createElement('div');
  monthDiv.className = 'data-grid-cell fw-semibold';
  monthDiv.textContent = month;

  const incomeDiv = document.createElement('div');
  incomeDiv.className = 'data-grid-cell';
  incomeDiv.innerHTML = `
    <div class="input-group input-group-sm">
      <span class="input-group-text">$</span>
      <input type="number" class="form-control money-input income-input"
             data-index="${i}" min="0" step="0.01" placeholder="0.00"
             aria-label="${month} income">
    </div>`;

  const expenseDiv = document.createElement('div');
  expenseDiv.className = 'data-grid-cell';
  expenseDiv.innerHTML = `
    <div class="input-group input-group-sm">
      <span class="input-group-text">$</span>
      <input type="number" class="form-control money-input expense-input"
             data-index="${i}" min="0" step="0.01" placeholder="0.00"
             aria-label="${month} expenses">
    </div>`;

  const netDiv = document.createElement('div');
  netDiv.className = 'data-grid-cell net-zero';
  netDiv.id = `net-${i}`;
  netDiv.textContent = '$0.00';

  dataGrid.insertBefore(monthDiv, firstFooterCell);
  dataGrid.insertBefore(incomeDiv, firstFooterCell);
  dataGrid.insertBefore(expenseDiv, firstFooterCell);
  dataGrid.insertBefore(netDiv, firstFooterCell);
});

/* ── Chart Initialisation ────────────────────────────────────────────────── */
const ctx = document.getElementById('barChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: MONTHS,
    datasets: [
      {
        label: 'Income',
        data: [...income],
        backgroundColor: 'rgba(25, 135, 84, 0.8)',
        borderColor: '#198754',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Expenses',
        data: [...expenses],
        backgroundColor: 'rgba(220, 53, 69, 0.75)',
        borderColor: '#dc3545',
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { padding: 20, font: { size: 13 } }
      },
      tooltip: {
        callbacks: {
          label: context => ` ${context.dataset.label}: ${usd(context.parsed.y)}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => usd(value)
        }
      }
    }
  }
});

/* ── Helpers ─────────────────────────────────────────────────────────────── */

/** Update the Net cell for row i with colour coding */
function updateNetCell(i) {
  const net  = income[i] - expenses[i];
  const cell = document.getElementById(`net-${i}`);
  cell.textContent = usd(net);
  cell.className   = net > 0 ? 'net-positive' : net < 0 ? 'net-negative' : 'net-zero';
}

/** Recalculate totals and push them to the footer + chart tab cards */
function updateSummary() {
  const totIncome   = income.reduce((a, b) => a + b, 0);
  const totExpenses = expenses.reduce((a, b) => a + b, 0);
  const totNet      = totIncome - totExpenses;

  // Data tab footer
  document.getElementById('totalIncome').textContent   = usd(totIncome);
  document.getElementById('totalExpenses').textContent = usd(totExpenses);
  const totalNetCell  = document.getElementById('totalNet');
  totalNetCell.textContent = usd(totNet);
  totalNetCell.className   = totNet > 0 ? 'net-positive' : totNet < 0 ? 'net-negative' : 'net-zero';

  // Chart tab summary cards
  document.getElementById('cardIncome').textContent   = usd(totIncome);
  document.getElementById('cardExpenses').textContent = usd(totExpenses);

  const cardNet          = document.getElementById('cardNet');
  const cardNetContainer = document.getElementById('cardNetContainer');
  cardNet.textContent    = usd(totNet);
  if (totNet > 0) {
    cardNet.className          = 'fs-5 fw-bold text-success';
    cardNetContainer.className = 'card border-success h-100';
  } else if (totNet < 0) {
    cardNet.className          = 'fs-5 fw-bold text-danger';
    cardNetContainer.className = 'card border-danger h-100';
  } else {
    cardNet.className          = 'fs-5 fw-bold text-secondary';
    cardNetContainer.className = 'card border-secondary h-100';
  }
}

/** Push current data arrays into the chart and redraw */
function updateChart() {
  chart.data.datasets[0].data = [...income];
  chart.data.datasets[1].data = [...expenses];
  chart.update();
}

/* ── Event Listeners ─────────────────────────────────────────────────────── */
document.querySelectorAll('.income-input').forEach(input => {
  input.addEventListener('input', e => {
    const i   = parseInt(e.target.dataset.index, 10);
    income[i] = parseFloat(e.target.value) || 0;
    updateNetCell(i);
    updateSummary();
    updateChart();
  });
});

document.querySelectorAll('.expense-input').forEach(input => {
  input.addEventListener('input', e => {
    const i      = parseInt(e.target.dataset.index, 10);
    expenses[i]  = parseFloat(e.target.value) || 0;
    updateNetCell(i);
    updateSummary();
    updateChart();
  });
});

document.getElementById('downloadChartBtn').addEventListener('click', () => {
  const link    = document.createElement('a');
  link.download = 'bucks2bar-chart.png';
  link.href     = document.getElementById('barChart').toDataURL('image/png');
  link.click();
});

}); // end DOMContentLoaded

/* ── Exports for testing ─────────────────────────────────────────────────── */
if (typeof module !== 'undefined') {
  module.exports = { validateUsername, usd };
}
