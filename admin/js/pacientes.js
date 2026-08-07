import { supabase } from './supabaseClient.js';
import { requireAuth, wireLogoutButton, markActiveNav } from './auth.js';

await requireAuth();
wireLogoutButton();
markActiveNav();

const form = document.getElementById('patientForm');
const formTitle = document.getElementById('formTitle');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const patientIdInput = document.getElementById('patientId');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const notesInput = document.getElementById('notes');
const searchInput = document.getElementById('searchInput');
const showArchivedCheckbox = document.getElementById('showArchived');
const tbody = document.getElementById('patientsTbody');

let patients = [];

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message visible ${type}`;
  setTimeout(() => formMessage.classList.remove('visible'), 4000);
}

function resetForm() {
  form.reset();
  patientIdInput.value = '';
  formTitle.textContent = 'Cadastrar paciente';
  submitBtn.textContent = 'Cadastrar';
  cancelEditBtn.style.display = 'none';
}

async function loadPatients() {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('name');

  if (error) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-state">Erro ao carregar pacientes.</td></tr>`;
    return;
  }

  patients = data;
  render();
}

function render() {
  const search = searchInput.value.trim().toLowerCase();
  const showArchived = showArchivedCheckbox.checked;

  const filtered = patients.filter((p) => {
    if (!showArchived && !p.active) return false;
    if (search && !p.name.toLowerCase().includes(search)) return false;
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-state">Nenhum paciente encontrado.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((p) => `
    <tr>
      <td>${escapeHtml(p.name)}</td>
      <td>${escapeHtml(p.phone || '—')}</td>
      <td>${escapeHtml(p.notes || '—')}</td>
      <td>${p.active ? '<span class="badge badge-pago">Ativo</span>' : '<span class="badge badge-pendente">Arquivado</span>'}</td>
      <td>
        <button class="btn-link" data-edit="${p.id}">Editar</button>
        <button class="btn-link" data-toggle="${p.id}">${p.active ? 'Arquivar' : 'Reativar'}</button>
      </td>
    </tr>
  `).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

tbody.addEventListener('click', async (e) => {
  const editId = e.target.dataset.edit;
  const toggleId = e.target.dataset.toggle;

  if (editId) {
    const p = patients.find((x) => x.id === editId);
    if (!p) return;
    patientIdInput.value = p.id;
    nameInput.value = p.name;
    phoneInput.value = p.phone || '';
    notesInput.value = p.notes || '';
    formTitle.textContent = 'Editar paciente';
    submitBtn.textContent = 'Salvar alterações';
    cancelEditBtn.style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (toggleId) {
    const p = patients.find((x) => x.id === toggleId);
    if (!p) return;
    const { error } = await supabase
      .from('patients')
      .update({ active: !p.active })
      .eq('id', toggleId);
    if (error) {
      showMessage('Erro ao atualizar paciente.', 'error');
      return;
    }
    await loadPatients();
  }
});

cancelEditBtn.addEventListener('click', resetForm);
searchInput.addEventListener('input', render);
showArchivedCheckbox.addEventListener('change', render);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = patientIdInput.value;
  const payload = {
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim() || null,
    notes: notesInput.value.trim() || null,
  };

  let error;
  if (id) {
    ({ error } = await supabase.from('patients').update(payload).eq('id', id));
  } else {
    ({ error } = await supabase.from('patients').insert(payload));
  }

  if (error) {
    showMessage('Erro ao salvar paciente.', 'error');
    return;
  }

  showMessage(id ? 'Paciente atualizado.' : 'Paciente cadastrado.', 'success');
  resetForm();
  await loadPatients();
});

loadPatients();
