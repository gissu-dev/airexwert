# WertWorks

This is my personal website and project hub.

I built it to have one place for my resume, contact info, bot projects, automation ideas, job-search tools, and future aerial planning work. It is not meant to look like a big agency site. It is more like a polished workshop for the things I am learning, building, and organizing.

The main idea behind WertWorks is simple: practical tools, clear information, and projects that solve real problems I have actually run into.

## What Is On The Site

- Home page with the WertWorks intro
- About page with my background and direction
- Projects page with filters and case-study links
- Automation and Discord bot project page
- Resume download and contact page
- Contact page with profile details and a draft-email form
- Job tools and admin pages for tracking applications
- Aerial planning page for future drone-service ideas
- Supabase-backed project admin area

## Projects I Care About Here

The bot projects are a big part of why I wanted the site to exist:

- House of Kith Bot
- Clocktower Bot
- KithWave Discord Music Bot

They are not perfect, but they are real projects built for real use. That matters more to me than pretending everything started out polished.

## Built With

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local shadcn/ui-style components
- Framer Motion
- Lucide React icons
- Supabase for project records
- Vercel for deployment

I am still learning and improving the structure as I go. Some parts are cleaner than others, but the goal is to keep making it easier to update and more honest about what is finished.

## Running It Locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

If port `3000` is already taken, Next.js will usually move to another port like `3001`.

On my Windows setup, this script is also available:

```powershell
.\start-dev.ps1
```

## Environment Variables

The public pages can mostly run from the local seed data, but the admin tools need Supabase Auth plus the database tables in `supabase/schema.sql`.

For the full setup, use:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

These go in `.env.local` for local development and in Vercel project settings for deployment.

Admin access is controlled by Supabase email/password login. Add the allowed user's `auth.users.id` to `public.admin_users.user_id`; the admin pages and admin API routes check that table before allowing private reads or writes.

Do not commit real keys, tokens, webhooks, bot secrets, or private credentials.

## Profile And Contact Data

Most of my public contact/profile information lives here:

```text
data/profile.ts
```

That file controls:

- Brand name
- Name
- Tagline
- Location
- Email
- Phone number
- Discord contact
- Resume download path
- GitHub link
- LinkedIn link
- Site URL

## Resume Asset

The active downloadable resume is a US Letter PDF:

```text
/resume.pdf
```

The source file is:

```text
public/resume.pdf
```

The site uses `profile.resumeDownloadPath` from `data/profile.ts`, and that should stay pointed at `/resume.pdf` unless I intentionally change the active resume file.

## Build Check

Before deploying, run:

```bash
npm run build
```

If that passes, the site should be in decent shape for Vercel.

## Deploying

This site is meant to deploy on Vercel.

Basic flow:

```bash
git add .
git commit -m "Update site"
git push
```

Vercel watches the GitHub repo and redeploys from `main`.

## Notes For Future Me

Things I still want to improve:

- Keep refreshing the resume image when the resume changes
- Finish connecting the contact form to a real backend
- Keep improving the project admin workflow
- Add better screenshots for projects
- Add deeper case studies for the bots
- Keep the aerial planning page careful and claim-safe
- Add reminders or calendar export for the job tools
- Keep cleaning up anything that feels overbuilt or too fake

## Why This Exists

I wanted a site that feels like me: technical, a little experimental, practical, and honest about the process.

This is not a perfect portfolio frozen in time. It is a living project that I can keep updating as I build more things.
