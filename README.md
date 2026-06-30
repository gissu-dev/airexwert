# WertWorks Personal Website

WertWorks is the personal website and project hub for Airex Wert. The site is built around automation, aviation, drone operations planning, bots, job tools, and practical applied technology.

## Project Overview

- Dark, technical WertWorks brand system
- Abstract aviation HUD / radar / command-interface hero
- About page with professional story, values, and timeline
- Filterable project showcase
- Aerial services planning page with claim-safe wording
- Aviation direction page
- Automation and bots page
- Employer-friendly resume page
- Local-only job search dashboard with LocalStorage and CSV export
- Contact page with mock form states and centralized profile data
- SEO metadata, sitemap, robots route, and Vercel-ready config

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style local components
- Framer Motion
- Lucide React
- LocalStorage for the job dashboard MVP

## Local Setup

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

If port `3000` is already in use, Next.js will automatically choose another port such as `3001`.

On this Windows machine, if a terminal cannot find `npm`, close PowerShell and open a new one. You can also run:

```powershell
.\start-dev.ps1
```

## Update Profile and Contact Data

Edit:

```text
data/profile.ts
```

This file controls:

- Brand name
- Personal name
- Tagline
- Location
- Email
- Phone number
- Discord / community contact
- Resume download path
- GitHub link
- LinkedIn link
- Site URL

Do not put secrets, API keys, bot tokens, webhook URLs, or private credentials in this file.

## Add Resume PDF

The resume download button points to:

```text
/resume.pdf
```

Add the real PDF here:

```text
public/resume.pdf
```

Until that file exists, the resume page shows where to add it.

## Build

```bash
npm run build
```

The build should complete before deploying.

## Push to GitHub

```bash
git init
git add .
git commit -m "Build WertWorks personal site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If this repo already has a remote:

```bash
git remote -v
```

## Deploy on Vercel

1. Push the project to GitHub.
2. Open Vercel and choose **Add New Project**.
3. Import the GitHub repo.
4. Keep the framework preset as **Next.js**.
5. Use the default build command:

```bash
npm run build
```

6. Deploy.

No required environment variables are needed for the current MVP.

## Future Updates and Redeploys

After the site is connected to Vercel, future updates redeploy automatically when you push to the production branch, usually `main`.

Standard update flow:

```bash
git add .
git commit -m "Update site"
git push
```

Vercel will detect the push, run the build, and publish the new version if the build passes.

## Phase 2 Ideas

- Add the final resume PDF
- Connect the contact form to Resend, Formspree, or a Vercel server action
- Add optional auth and database sync for the job dashboard
- Add detailed project case study pages
- Add future aerial work intake and launch-planning workflow
- Add calendar export or browser notifications for follow-ups
- Add privacy-conscious analytics after tracking preferences are decided
