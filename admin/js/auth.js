// Guard de sessão + login/logout, compartilhado por todas as páginas do admin.
import { supabase } from './supabaseClient.js';

// Chame no topo de toda página protegida (dashboard, pacientes, atendimentos, receber, despesas).
// Redireciona para o login se não houver sessão ativa.
export async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  return session;
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}

export function wireLogoutButton(selector = '#logoutBtn') {
  const btn = document.querySelector(selector);
  if (btn) btn.addEventListener('click', logout);
}

// Marca o link de navegação da página atual como ativo.
export function markActiveNav() {
  const current = window.location.pathname.split('/').pop();
  document.querySelectorAll('.app-nav a[data-page]').forEach((link) => {
    if (link.dataset.page === current) link.classList.add('active');
  });
}
