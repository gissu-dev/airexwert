create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  stage text not null default 'In progress' check (
    stage in ('Active', 'In progress', 'Future planning', 'Documenting')
  ),
  featured boolean not null default false,
  short_description text not null default '',
  full_description text not null default '',
  problem text not null default '',
  solution text not null default '',
  features text[] not null default '{}',
  tech_used text[] not null default '{}',
  next_step text not null default '',
  case_study_status text not null default 'coming-soon' check (
    case_study_status in ('ready', 'coming-soon')
  ),
  github_url text not null default '',
  live_url text not null default '',
  case_study_url text not null default '',
  image_url text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_status_idx on public.projects (status);
create index if not exists projects_featured_idx on public.projects (featured);

alter table public.projects enable row level security;
alter table public.projects force row level security;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_projects_updated_at on public.projects;

create trigger set_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

create table if not exists public.jobs (
  id text primary key,
  title text not null,
  company text not null,
  location text not null default '',
  pay text not null default '',
  job_url text not null default '',
  source text not null default '',
  status text not null default 'saved' check (
    status in (
      'saved',
      'applied',
      'interviewing',
      'follow_up',
      'offer',
      'rejected',
      'archived'
    )
  ),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  date_saved date,
  date_applied date,
  interview_date date,
  follow_up_date date,
  next_action text not null default '',
  contact_name text not null default '',
  contact_email text not null default '',
  contact_phone text not null default '',
  resume_used text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists jobs_status_idx on public.jobs (status);
create index if not exists jobs_follow_up_date_idx on public.jobs (follow_up_date);
create index if not exists jobs_priority_idx on public.jobs (priority);

alter table public.jobs enable row level security;
alter table public.jobs force row level security;

drop trigger if exists set_jobs_updated_at on public.jobs;

create trigger set_jobs_updated_at
before update on public.jobs
for each row
execute function public.set_updated_at();

create table if not exists public.field_notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null check (
    category in (
      'Build Logs',
      'Website Notes',
      'Bot Notes',
      'Aviation',
      'AI Experiments',
      'Systems',
      'Personal Notes',
      'Learning Notes',
      'Project Updates',
      'Ideas',
      'Places',
      'Urbex',
      'Career Notes',
      'Gear / Tools'
    )
  ),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  featured boolean not null default false,
  excerpt text not null default '',
  content text not null default '',
  tags text[] not null default '{}',
  read_time text not null default '4 min',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists field_notes_status_idx on public.field_notes (status);
create index if not exists field_notes_featured_idx on public.field_notes (featured);
create index if not exists field_notes_slug_idx on public.field_notes (slug);
create index if not exists field_notes_published_at_idx on public.field_notes (published_at);

alter table public.field_notes enable row level security;
alter table public.field_notes force row level security;

drop trigger if exists set_field_notes_updated_at on public.field_notes;

create trigger set_field_notes_updated_at
before update on public.field_notes
for each row
execute function public.set_updated_at();

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  reason text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_messages_status_idx on public.contact_messages (status);
create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at);

alter table public.contact_messages enable row level security;
alter table public.contact_messages force row level security;

drop trigger if exists set_contact_messages_updated_at on public.contact_messages;

create trigger set_contact_messages_updated_at
before update on public.contact_messages
for each row
execute function public.set_updated_at();

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.admin_users force row level security;

drop policy if exists "Published projects are readable" on public.projects;
create policy "Published projects are readable"
on public.projects
for select
using (status = 'published');

drop policy if exists "Published field notes are readable" on public.field_notes;
create policy "Published field notes are readable"
on public.field_notes
for select
using (status = 'published');

drop policy if exists "Admins can read their own admin record" on public.admin_users;
create policy "Admins can read their own admin record"
on public.admin_users
for select
to authenticated
using ((select auth.uid()) = user_id);
