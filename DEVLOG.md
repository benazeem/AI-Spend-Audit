# DEVLOG

# Day 1

## Hours Worked

~6 hours

---

# What I Did

Focused mainly on project architecture, stack setup, UI system, recommendation engine planning, and audit flow decisions.

Setup completed: Next.js 16, TypeScript, Tailwind v4, shadcn/ui, Prisma, Supabase, Vitest.

Built: landing page, audit/results/share route shells, reusable layout components (Navbar, SubNavbar, PageContainer, PageHeader, Footer), dark SaaS design system with Geist + Inter typography and emerald/blue accent palette.

Started: audit engine, pricing benchmarks, TypeScript types, Zod validation schemas. API route files created but handlers not yet implemented.

Also finalized the audit persistence architecture. Initially planned localStorage-first flow, then switched to saving all audits directly in DB with public sharing controlled via `isPublic` and `shareToken`. Cleaner architecture, proper persistence, simpler share flow.

Backend approach: all reads and writes go through API routes.

---

# Main Learnings

This assignment is more about product thinking, UX decisions, and execution quality than complicated engineering.

Rule-based recommendations make more sense than AI-generated ones — deterministic, testable, explainable.

Keeping API routes clean and focused (one route per action) makes the backend easier to understand and test.

---

# Problems / Blockers

Main blocker was deciding audit persistence flow — DB vs localStorage, share architecture, API route structure, and lead capture placement.

Spent time refining architecture decisions before going deeper into implementation.

---

# Decisions Made

Finalized: dark SaaS UI, Geist + Inter typography, emerald/blue accents, DB-first audit flow, share tokens for public pages, minimal API routes, rule-based recommendation engine.

---

# Tomorrow Plan

Build audit form with dynamic tool inputs, React Hook Form + Zod validation, audit creation flow, pricing metadata, and better engine structure.

Main goal: complete audit submission flow working end-to-end.
