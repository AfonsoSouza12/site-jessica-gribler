-- Schema do sistema de gestão de atendimentos (admin/)
-- Rode este arquivo uma vez no SQL Editor do seu projeto Supabase (supabase.com).

create extension if not exists "pgcrypto";

create table patients (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text,
  notes       text,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

create table payment_methods (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  active      boolean not null default true,
  sort_order  int not null default 0
);

create table sessions (
  id                 uuid primary key default gen_random_uuid(),
  patient_id         uuid not null references patients(id),
  payment_method_id  uuid not null references payment_methods(id),
  session_date       date not null,
  session_time       time,
  value_cents        integer,
  status             text not null check (status in ('pendente', 'pago')),
  created_at         timestamptz not null default now()
);

create table expenses (
  id            uuid primary key default gen_random_uuid(),
  expense_type  text not null,
  value_cents   integer not null,
  note          text,
  expense_date  date not null default current_date,
  created_at    timestamptz not null default now()
);

create index sessions_patient_id_idx on sessions(patient_id);
create index sessions_payment_method_id_idx on sessions(payment_method_id);
create index sessions_session_date_idx on sessions(session_date);
create index expenses_expense_date_idx on expenses(expense_date);

-- Row Level Security: só usuários autenticados (os logins criados em Authentication > Users) leem/escrevem.
alter table patients enable row level security;
alter table payment_methods enable row level security;
alter table sessions enable row level security;
alter table expenses enable row level security;

create policy "authenticated full access" on patients
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated full access" on payment_methods
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated full access" on sessions
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated full access" on expenses
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Tipos de cobrança iniciais (ela pode cadastrar mais depois pela tela de Atendimentos).
insert into payment_methods (name, sort_order) values
  ('Particular', 1),
  ('Pacote', 2);
