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
  id uuid primary key default gen_random_uuid(),
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

drop trigger if exists set_jobs_updated_at on public.jobs;

create trigger set_jobs_updated_at
before update on public.jobs
for each row
execute function public.set_updated_at();
