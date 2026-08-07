import { supabase } from './supabaseClient.js';
import { requireAuth, wireLogoutButton, markActiveNav } from './auth.js';
import { centsToBRL, reaisToCents, dateToBR, escapeHtml } from './format.js';

await requireAuth();
wireLogoutButton();
markActiveNav();

const form = document.getElementById('sessionForm');
const formTitle = document.getElementById('formTitle');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const sessionIdInput = document.getElementById('sessionId');
const patientSelect = document.getElementById('patientSelect');
const paymentMethodSelect = document.getElementById('paymentMethodSelect');
const sessionDateInput = document.getElementById('sessionDate');
const sessionTimeInput = document.getElementById('sessionTime');
const valueInput = document.getElementById('value');
const statusSelect = document.getElementById('status');
const searchInput = document.getElementById('searchInput');
const tbody = document.getElementById('sessionsTbody');

let sessions = [];

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message visible ${type}`;
  setTimeout(() => formMessage.classList.remove('visible'), 4000);
}

function resetForm() {
  form.reset();
  sessionIdInput.value = '';
  formTitle.textContent = 'Lançar atendimento';
  submitBtn.textContent = 'Lançar atendimento';
  cancelEditBtn.style.display = 'none';
  statusSelect.value = 'pendente';
}

async function loadLookups() {
  const [{ data: patients }, { data: methods }] = await Promise.all([
    supabase.from('patients').select('id, name').eq('active', true).order('name'),
    supabase.from('payment_methods').select('id, name').eq('active', true).order('sort_order'),
  ]);

  patientSelect.innerHTML = (patients || [])
    .map((p) => `<option value="${p.id}">${escapeHtml(p.name)}</option>`)
    .join('');
  paymentMethodSelect.innerHTML = (methods || [])
    .map((m) => `<option value="${m.id}">${escapeHtml(m.name)}</option>`)
    .join('');
}

async function loadSessions() {
  const { data, error } = await supabase
    .from('sessions')
    .select('*, patients(name), payment_methods(name)')
    .order('session_date', { ascending: false })
    .order('session_time', { ascending: false })
    .limit(300);

  if (error) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-state">Erro ao carregar atendimentos.</td></tr>`;
    return;
  }

  sessions = data;
  render();
}

function render() {
  const search = searchInput.value.trim().toLowerCase();
  const filtered = sessions.filter((s) => {
    if (!search) return true;
    return (s.patients?.name || '').toLowerCase().includes(search);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="empty-state">Nenhum atendimento encontrado.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((s) => `
    <tr>
      <td>${dateToBR(s.session_date)}</td>
      <td>${s.session_time ? s.session_time.slice(0, 5) : '—'}</td>
      <td>${escapeHtml(s.patients?.name || '—')}</td>
      <td>${escapeHtml(s.payment_methods?.name || '—')}</td>
      <td>${centsToBRL(s.value_cents)}</td>
      <td><span class="badge badge-${s.status}">${s.status === 'pago' ? 'Pago' : 'Pendente'}</span></td>
      <td>
        <button class="btn-link" data-edit="${s.id}">Editar</button>
        <button class="btn-link" data-toggle-status="${s.id}" data-current-status="${s.status}">${s.status === 'pago' ? 'Marcar pendente' : 'Marcar pago'}</button>
        <button class="btn-link" data-delete="${s.id}">Excluir</button>
      </td>
    </tr>
  `).join('');
}

tbody.addEventListener('click', async (e) => {
  const editId = e.target.dataset.edit;
  const toggleId = e.target.dataset.toggleStatus;
  const deleteId = e.target.dataset.delete;

  if (editId) {
    const s = sessions.find((x) => x.id === editId);
    if (!s) return;
    sessionIdInput.value = s.id;
    patientSelect.value = s.patient_id;
    paymentMethodSelect.value = s.payment_method_id;
    sessionDateInput.value = s.session_date;
    sessionTimeInput.value = s.session_time ? s.session_time.slice(0, 5) : '';
    valueInput.value = s.value_cents !== null ? (s.value_cents / 100).toFixed(2) : '';
    statusSelect.value = s.status;
    formTitle.textContent = 'Editar atendimento';
    submitBtn.textContent = 'Salvar alterações';
    cancelEditBtn.style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (toggleId) {
    const newStatus = e.target.dataset.currentStatus === 'pago' ? 'pendente' : 'pago';
    const { error } = await supabase.from('sessions').update({ status: newStatus }).eq('id', toggleId);
    if (error) {
      showMessage('Erro ao atualizar status.', 'error');
      return;
    }
    await loadSessions();
  }

  if (deleteId) {
    if (!confirm('Excluir este atendimento? Essa ação não pode ser desfeita.')) return;
    const { error } = await supabase.from('sessions').delete().eq('id', deleteId);
    if (error) {
      showMessage('Erro ao excluir atendimento.', 'error');
      return;
    }
    await loadSessions();
  }
});

cancelEditBtn.addEventListener('click', resetForm);
searchInput.addEventListener('input', render);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = sessionIdInput.value;
  const payload = {
    patient_id: patientSelect.value,
    payment_method_id: paymentMethodSelect.value,
    session_date: sessionDateInput.value,
    session_time: sessionTimeInput.value || null,
    value_cents: reaisToCents(valueInput.value),
    status: statusSelect.value,
  };

  let error;
  if (id) {
    ({ error } = await supabase.from('sessions').update(payload).eq('id', id));
  } else {
    ({ error } = await supabase.from('sessions').insert(payload));
  }

  if (error) {
    showMessage('Erro ao salvar atendimento.', 'error');
    return;
  }

  showMessage(id ? 'Atendimento atualizado.' : 'Atendimento lançado.', 'success');
  resetForm();
  await loadSessions();
});

resetForm();
await loadLookups();
await loadSessions();
