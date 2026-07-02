# Projects Manual Setup

Run this SQL in the Supabase SQL editor to add the Spotify Liked Songs Feed to the live Projects data. This is UUID-safe: it updates an existing row by slug if one exists, or inserts a new row with `gen_random_uuid()`.

```sql
create extension if not exists pgcrypto;

alter table public.projects
  add column if not exists case_study_images text[] not null default '{}';

with project_data as (
  select
    'spotify-liked-songs-feed'::text as slug,
    'Spotify Liked Songs Feed'::text as title,
    'Automation Tools'::text as category,
    'published'::text as status,
    'In progress'::text as stage,
    false::boolean as featured,
    $$A small website feed that pulls the latest 20 saved Spotify tracks into the About page.$$::text as short_description,
    $$The Spotify Liked Songs Feed connects WertWorks to Spotify's Web API and shows a compact list of recently saved tracks on the About page. It uses server-side Spotify credentials, a refresh token, album art, track metadata, save dates, and direct Spotify links without exposing private API secrets in the browser.$$::text as full_description,
    $$Music is part of the personal context behind the site, but embedding a whole playlist can feel too static and too separate from what is actually being listened to recently.$$::text as problem,
    $$Use the Spotify Web API to fetch the latest 20 saved tracks from the account library and render them as a compact, scrollable About-page card with album art, artists, timestamps, and links.$$::text as solution,
    array[
      'Server-side Spotify token refresh using private environment variables.',
      'Recent 20 liked songs with album art, artist names, save dates, and track duration.',
      'Compact About-page card with a styled internal scrollbar.',
      'Fallback preview and disconnected states for local testing and missing credentials.'
    ]::text[] as features,
    array['Next.js', 'Spotify Web API', 'TypeScript', 'Environment variables']::text[] as tech_used,
    $$Decide whether to keep it as a live pull from Spotify or cache new likes into a small archive later.$$::text as next_step,
    'ready'::text as case_study_status,
    ''::text as github_url,
    '/about'::text as live_url,
    ''::text as case_study_url,
    ''::text as image_url,
    array[]::text[] as case_study_images
),
target as (
  select
    p.*,
    existing.id as existing_id
  from project_data p
  left join public.projects existing on existing.slug = p.slug
),
updated as (
  update public.projects projects
  set
    title = target.title,
    slug = target.slug,
    category = target.category,
    status = target.status,
    stage = target.stage,
    featured = target.featured,
    short_description = target.short_description,
    full_description = target.full_description,
    problem = target.problem,
    solution = target.solution,
    features = target.features,
    tech_used = target.tech_used,
    next_step = target.next_step,
    case_study_status = target.case_study_status,
    github_url = target.github_url,
    live_url = target.live_url,
    case_study_url = target.case_study_url,
    image_url = target.image_url,
    case_study_images = target.case_study_images,
    updated_at = now()
  from target
  where projects.id = target.existing_id
  returning projects.id
)
insert into public.projects (
  id,
  title,
  slug,
  category,
  status,
  stage,
  featured,
  short_description,
  full_description,
  problem,
  solution,
  features,
  tech_used,
  next_step,
  case_study_status,
  github_url,
  live_url,
  case_study_url,
  image_url,
  case_study_images,
  created_at,
  updated_at
)
select
  gen_random_uuid(),
  title,
  slug,
  category,
  status,
  stage,
  featured,
  short_description,
  full_description,
  problem,
  solution,
  features,
  tech_used,
  next_step,
  case_study_status,
  github_url,
  live_url,
  case_study_url,
  image_url,
  case_study_images,
  now(),
  now()
from target
where existing_id is null;
```
