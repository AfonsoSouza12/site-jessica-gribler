import { supabase } from './supabaseClient.js';
import { requireAuth, wireLogoutButton, markActiveNav } from './auth.js';
import { centsToBRL, escapeHtml } from './format.js';

await requireAuth();
wireLogoutButton();
markActiveNav();

const statCount = document.getElementById('statCount');
const statAvg = document.getElementById('statAvg');
const statReceived = document.getElementById('statReceived');
const statPending = document.getElementById('statPending');
const methodBreakdownTbody = document.getElementById('methodBreakdownTbody');
const monthlyTbody = document.getElementById('monthlyTbody');

const MONTH_NAMES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

async function load() {
  const [{ data: sessions, error: sErr }, { data: expenses, error: eErr }] = await Promise.all([
    supabase.from('sessions').select('*, payment_methods(name)'),
    supabase.from('expenses').select('value_cents, expense_date'),
  ]);

  if (sErr || eErr) {
    statCount.textContent = 'Erro';
    return;
  }

  renderStats(sessions);
  renderMethodBreakdown(sessions);
  renderMonthly(sessions, expenses);
}

function renderStats(sessions) {
  const count = sessions.length;
  const valued = sessions.filter((s) => s.value_cents !== null);
  const avg = valued.length ? valued.reduce((sum, s) => sum + s.value_cents, 0) / valued.length : 0;
  const received = sessions.filter((s) => s.status === 'pago').reduce((sum, s) => sum + (s.value_cents || 0), 0);
  const pending = sessions.filter((s) => s.status === 'pendente').reduce((sum, s) => sum + (s.value_cents || 0), 0);

  statCount.textContent = count;
  statAvg.textContent = centsToBRL(Math.round(avg));
  statReceived.textContent = centsToBRL(received);
  statPending.textContent = centsToBRL(pending);
}

function renderMethodBreakdown(sessions) {
  const byMethod = {};
  for (const s of sessions) {
    const name = s.payment_methods?.name || 'Sem tipo';
    if (!byMethod[name]) byMethod[name] = { count: 0, total: 0 };
    byMethod[name].count += 1;
    byMethod[name].total += s.value_cents || 0;
  }

  const rows = Object.entries(byMethod);
  if (rows.length === 0) {
    methodBreakdownTbody.innerHTML = `<tr><td colspan="3" class="empty-state">Sem dados ainda.</td></tr>`;
    return;
  }

  methodBreakdownTbody.innerHTML = rows.map(([name, v]) => `
    <tr>
      <td>${escapeHtml(name)}</td>
      <td>${v.count}</td>
      <td>${centsToBRL(v.total)}</td>
    </tr>
  `).join('');
}

function renderMonthly(sessions, expenses) {
  const byMonth = {};

  function monthKey(dateStr) {
    return dateStr.slice(0, 7); // yyyy-mm
  }

  for (const s of sessions) {
    const key = monthKey(s.session_date);
    if (!byMonth[key]) byMonth[key] = { count: 0, faturamento: 0, despesas: 0 };
    byMonth[key].count += 1;
    if (s.status === 'pago') byMonth[key].faturamento += s.value_cents || 0;
  }

  for (const e of expenses) {
    const key = monthKey(e.expense_date);
    if (!byMonth[key]) byMonth[key] = { count: 0, faturamento: 0, despesas: 0 };
    byMonth[key].despesas += e.value_cents;
  }

  const keys = Object.keys(byMonth).sort();
  if (keys.length === 0) {
    monthlyTbody.innerHTML = `<tr><td colspan="5" class="empty-state">Sem dados ainda.</td></tr>`;
    return;
  }

  monthlyTbody.innerHTML = keys.map((key) => {
    const [year, month] = key.split('-');
    const label = `${MONTH_NAMES[parseInt(month, 10) - 1]}/${year}`;
    const m = byMonth[key];
    const lucro = m.faturamento - m.despesas;
    return `
      <tr>
        <td>${label}</td>
        <td>${m.count}</td>
        <td>${centsToBRL(m.faturamento)}</td>
        <td>${centsToBRL(m.despesas)}</td>
        <td>${centsToBRL(lucro)}</td>
      </tr>
    `;
  }).join('');
}

load();
