# HR Architect

![App Preview](https://imgix.cosmicjs.com/ebcf3b90-4a1d-11f1-bcf8-37f10fb0697d-autopilot-photo-1497366216548-37526070297c-1778162779585.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A luxury SaaS platform automating strategic HR positioning — built with Next.js 16, Tailwind CSS, Framer Motion, and Cosmic CMS.

## Features

- Candidate profiles with seniority, expertise, and business impact
- Target company intelligence (SIRENE-ready, growth trajectory, weak signals)
- Positioning reports with 3D scoring visualization & match diff
- Curated approach messages library
- Consultant portfolio (multi-tenant) management
- Glassmorphism luxury dark UI with conic-gradient borders
- Fully responsive & server-rendered

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69fc9bbea963c4f5f0d9b505&clone_repository=69fc9d65a963c4f5f0d9b57e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: # [RÔLE EXPERT] : SENIOR FULL STACK ARCHITECT & AI STRATEGIST (CLAUDE 3.5 SPECIALIST) Tu es l'architecte principal de "HR ARCHITECT", une plateforme SaaS de luxe automatisant le positionnement stratégique RH. Ton code doit être élégant, sécurisé et hautement performant. ..."

### Code Generation Prompt

> Build a Next.js application for a website called "[RÔLE EXPERT] SENIOR". The content is managed in Cosmic CMS with the following object types: candidate-profiles, target-companies, positioning-reports, approach-messages, consultant-portfolios. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- Next.js 16 (App Router, Server Components)
- React 19
- TypeScript (strict)
- Tailwind CSS
- Framer Motion
- Cosmic SDK v2

## Getting Started

### Prerequisites
- Bun or Node.js 18+
- A Cosmic account & bucket

### Installation
```bash
bun install
bun run dev
```

Set environment variables in `.env.local`:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

```ts
const { objects } = await cosmic.objects
  .find({ type: 'positioning-reports' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app reads from five connected object types: candidate-profiles, target-companies, positioning-reports (linking candidates ↔ companies), approach-messages (linking reports), and consultant-portfolios (linking candidates).

## Deployment Options

- **Vercel** — recommended for Next.js
- **Netlify** — set environment variables in dashboard

<!-- README_END -->