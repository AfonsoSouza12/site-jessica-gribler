import { supabase } from './supabaseClient.js';
import { requireAuth, wireLogoutButton, markActiveNav } from './auth.js';
import { centsToBRL, dateToBR, escapeHtml } from './format.js';

await requireAuth();
wireLogoutButton();
markActiveNav();

const patientFilter = document.getElementById('patientFilter');
const methodFilter = document.getElementById('methodFilter');
const pendingCount = document.getElementById('pendingCount');
const pendingTotal = document.getElementById('pendingTotal');
const tbody = document.getElementById('pendingTbody');

let pendingSessions = [];

async function loadFilters() {
  const [{ data: patients }, { data: methods }] = await Promise.all([
    supabase.from('patients').select('id, name').order('name'),
    supabase.from('payment_methods').select('id, name').order('sort_order'),
  ]);

  patientFilter.innerHTML = '<option value="">Todos os pacientes</option>' +
    (patients || []).map((p) => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('');
  methodFilter.innerHTML = '<option value="">Todos os tipos de cobrança</option>' +
    (methods || []).map((m) => `<option value="${m.id}">${escapeHtml(m.name)}</option>`).join('');
}

async function loadPending() {
  const { data, error } = await supabase
    .from('sessions')
    .select('*, patients(name), payment_methods(name)')
    .eq('status', 'pendente')
    .order('session_date', { ascending: false });

  if (error) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-state">Erro ao carregar pendências.</td></tr>`;
    return;
  }

  pendingSessions = data;
  render();
}

function render() {
  const patientId = patientFilter.value;
  const methodId = methodFilter.value;

  const filtered = pendingSessions.filter((s) => {
    if (patientId && s.patient_id !== patientId) return false;
    if (methodId && s.payment_method_id !== methodId) return false;
    return true;
  });

  const total = filtered.reduce((sum, s) => sum + (s.value_cents || 0), 0);
  pendingCount.textContent = filtered.length;
  pendingTotal.textContent = centsToBRL(total);

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-state">Nenhuma sessão pendente para esse filtro.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((s) => `
    <tr>
      <td>${dateToBR(s.session_date)}</td>
      <td>${escapeHtml(s.patients?.name || '—')}</td>
      <td>${escapeHtml(s.payment_methods?.name || '—')}</td>
      <td>${centsToBRL(s.value_cents)}</td>
      <td><button class="btn-link" data-mark-paid="${s.id}">Marcar como pago</button></td>
    </tr>
  `).join('');
}

tbody.addEventListener('click', async (e) => {
  const id = e.target.dataset.markPaid;
  if (!id) return;
  const { error } = await supabase.from('sessions').update({ status: 'pago' }).eq('id', id);
  if (!error) await loadPending();
});

patientFilter.addEventListener('change', render);
methodFilter.addEventListener('change', render);

await loadFilters();
await loadPending();
