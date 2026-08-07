import { supabase } from './supabaseClient.js';
import { requireAuth, wireLogoutButton, markActiveNav } from './auth.js';
import { centsToBRL, reaisToCents, dateToBR, escapeHtml } from './format.js';

await requireAuth();
wireLogoutButton();
markActiveNav();

const form = document.getElementById('expenseForm');
const formTitle = document.getElementById('formTitle');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const expenseIdInput = document.getElementById('expenseId');
const typeInput = document.getElementById('expenseType');
const valueInput = document.getElementById('expenseValue');
const dateInput = document.getElementById('expenseDate');
const noteInput = document.getElementById('expenseNote');
const expensesTotal = document.getElementById('expensesTotal');
const tbody = document.getElementById('expensesTbody');

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message visible ${type}`;
  setTimeout(() => formMessage.classList.remove('visible'), 4000);
}

function resetForm() {
  form.reset();
  expenseIdInput.value = '';
  formTitle.textContent = 'Cadastrar despesa';
  submitBtn.textContent = 'Cadastrar';
  cancelEditBtn.style.display = 'none';
  dateInput.value = new Date().toISOString().slice(0, 10);
}

async function loadExpenses() {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('expense_date', { ascending: false });

  if (error) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-state">Erro ao carregar despesas.</td></tr>`;
    return;
  }

  const total = data.reduce((sum, e) => sum + e.value_cents, 0);
  expensesTotal.textContent = centsToBRL(total);

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-state">Nenhuma despesa cadastrada.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map((e) => `
    <tr>
      <td>${dateToBR(e.expense_date)}</td>
      <td>${escapeHtml(e.expense_type)}</td>
      <td>${centsToBRL(e.value_cents)}</td>
      <td>${escapeHtml(e.note || '—')}</td>
      <td>
        <button class="btn-link" data-edit="${e.id}">Editar</button>
        <button class="btn-link" data-delete="${e.id}">Excluir</button>
      </td>
    </tr>
  `).join('');

  window.__expenses = data;
}

tbody.addEventListener('click', async (e) => {
  const editId = e.target.dataset.edit;
  const deleteId = e.target.dataset.delete;

  if (editId) {
    const exp = window.__expenses.find((x) => x.id === editId);
    if (!exp) return;
    expenseIdInput.value = exp.id;
    typeInput.value = exp.expense_type;
    valueInput.value = (exp.value_cents / 100).toFixed(2);
    dateInput.value = exp.expense_date;
    noteInput.value = exp.note || '';
    formTitle.textContent = 'Editar despesa';
    submitBtn.textContent = 'Salvar alterações';
    cancelEditBtn.style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (deleteId) {
    if (!confirm('Excluir esta despesa?')) return;
    const { error } = await supabase.from('expenses').delete().eq('id', deleteId);
    if (error) {
      showMessage('Erro ao excluir despesa.', 'error');
      return;
    }
    await loadExpenses();
  }
});

cancelEditBtn.addEventListener('click', resetForm);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = expenseIdInput.value;
  const payload = {
    expense_type: typeInput.value.trim(),
    value_cents: reaisToCents(valueInput.value),
    expense_date: dateInput.value,
    note: noteInput.value.trim() || null,
  };

  let error;
  if (id) {
    ({ error } = await supabase.from('expenses').update(payload).eq('id', id));
  } else {
    ({ error } = await supabase.from('expenses').insert(payload));
  }

  if (error) {
    showMessage('Erro ao salvar despesa.', 'error');
    return;
  }

  showMessage(id ? 'Despesa atualizada.' : 'Despesa cadastrada.', 'success');
  resetForm();
  await loadExpenses();
});

resetForm();
await loadExpenses();
