// Configuração do Supabase deste sistema.
// Preencha com os dados do seu projeto (Supabase > Project Settings > API).
// A "anon key" é segura para expor aqui — a proteção real dos dados vem das
// políticas de RLS definidas em supabase/schema.sql. Veja admin/README.md.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://grzlfwgbfewnfvqbmzwq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdyemxmd2diZmV3bmZ2cWJtendxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNTk4MDEsImV4cCI6MjEwMTYzNTgwMX0.wsMp8YenSJFczI-qppnTxoX1uDSUWEVIKaUhPOcfndI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
