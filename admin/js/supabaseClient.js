// Configuração do Supabase deste sistema.
// Preencha com os dados do seu projeto (Supabase > Project Settings > API).
// A "anon key" é segura para expor aqui — a proteção real dos dados vem das
// políticas de RLS definidas em supabase/schema.sql. Veja admin/README.md.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'COLE_AQUI_A_URL_DO_SEU_PROJETO_SUPABASE';
const SUPABASE_ANON_KEY = 'COLE_AQUI_A_ANON_KEY_DO_SEU_PROJETO_SUPABASE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
