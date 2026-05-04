-- ============================================
-- Bailar CRM 360 — Esquema completo do banco
-- Execute este SQL no SQL Editor do Supabase
-- ============================================

-- 1. Usuários do sistema
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password_hash text not null,
  role text not null check (role in ('admin','gestor','atendimento','financeiro','professor')),
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Leads
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  age int,
  interest_modality text,
  source text,
  campaign text,
  status text default 'novo' check (status in ('novo','em_atendimento','horarios_enviados','valores_enviados','aula_agendada','compareceu','matriculado','perdido')),
  temperature text default 'frio' check (temperature in ('frio','morno','quente')),
  assigned_user_id uuid references users(id),
  first_contact_date timestamptz,
  last_contact_date timestamptz,
  next_action_date timestamptz,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Alunos
create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  birth_date date,
  age int,
  status text default 'ativo' check (status in ('ativo','em_teste','inadimplente','pausado','cancelado')),
  main_modality text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Responsáveis
create table if not exists guardians (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  student_id uuid references students(id) on delete cascade,
  relationship text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. Professores
create table if not exists teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  specialty text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. Turmas
create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  modality text not null,
  level text default 'iniciante' check (level in ('iniciante','intermediario','avancado','infantil','adulto')),
  teacher_id uuid references teachers(id),
  weekday text not null,
  start_time text not null,
  end_time text not null,
  room text,
  capacity int default 20,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 7. Matrículas
create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  class_id uuid references classes(id) on delete cascade,
  plan text,
  monthly_value numeric(10,2),
  start_date date,
  due_day int,
  status text default 'ativa' check (status in ('ativa','pendente','pausada','cancelada')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 8. Presenças
create table if not exists attendance (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  class_id uuid references classes(id),
  teacher_id uuid references teachers(id),
  date date not null,
  status text default 'presente' check (status in ('presente','falta','falta_justificada','reposicao_pendente','reposicao_feita')),
  notes text,
  created_at timestamptz default now()
);

-- 9. Pagamentos
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  enrollment_id uuid references enrollments(id),
  amount numeric(10,2) not null,
  due_date date not null,
  paid_date date,
  status text default 'em_aberto' check (status in ('pago','em_aberto','vencido','negociado')),
  payment_method text,
  discount numeric(10,2),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 10. Deals (funil de vendas)
create table if not exists deals (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id),
  student_id uuid references students(id),
  title text not null,
  modality text,
  amount numeric(10,2),
  pipeline_stage text default 'novo_lead' check (pipeline_stage in ('novo_lead','qualificado','oferta_enviada','aula_agendada','aula_realizada','matricula_enviada','ganho','perdido')),
  probability int,
  expected_close_date date,
  closed_at timestamptz,
  lost_reason text,
  assigned_user_id uuid references users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 11. Tarefas
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  related_type text,
  related_id uuid,
  assigned_user_id uuid references users(id),
  due_date timestamptz,
  priority text default 'media' check (priority in ('baixa','media','alta','urgente')),
  status text default 'pendente' check (status in ('pendente','em_andamento','concluida','atrasada')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 12. Tickets
create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id),
  lead_id uuid references leads(id),
  title text not null,
  description text,
  category text not null check (category in ('atendimento','financeiro','professor','aula','cancelamento','reclamacao','duvida')),
  status text default 'aberto' check (status in ('aberto','em_atendimento','aguardando_cliente','resolvido')),
  priority text default 'media' check (priority in ('baixa','media','alta','urgente')),
  assigned_user_id uuid references users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 13. Eventos
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date date not null,
  start_time text,
  end_time text,
  location text,
  price numeric(10,2),
  status text default 'ativo',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 14. Logs de auditoria
create table if not exists logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  old_value jsonb,
  new_value jsonb,
  created_at timestamptz default now()
);

-- Índice para consultas de auditoria
create index if not exists idx_logs_entity on logs(entity_type, entity_id);
create index if not exists idx_logs_user on logs(user_id);

-- ============================================
-- Seed: usuário admin padrão (senha: 123456)
-- ============================================
insert into users (name, email, password_hash, role) values
  ('Administrador', 'admin@bailar.com',       '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin'),
  ('Gestor',        'gestor@bailar.com',      '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'gestor'),
  ('Atendimento',   'atendimento@bailar.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'atendimento'),
  ('Financeiro',    'financeiro@bailar.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'financeiro'),
  ('Professor',     'professor@bailar.com',   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'professor')
on conflict (email) do nothing;
