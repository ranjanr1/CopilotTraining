# Agent Instructions — Copilot Training Workspace

This workspace contains two projects. All detailed coding standards are split into focused documents in the `/docs` directory.

> **MANDATORY**: You MUST use the `read_file` tool to read every relevant `/docs` file BEFORE generating or modifying any code. Do not rely on summaries or prior context — always read the actual file.

## Projects

| Directory | Type | Description |
|---|---|---|
| `linkshortnerproject/` | Next.js 16 (App Router) | Full-stack link-shortener app with auth, database, and UI |
| `Bucks2Bar/` | Vanilla JS + Jest | Budget-to-bar tracker — plain HTML/CSS/JS, no framework |

---

## Documentation Index

**REQUIRED STEP**: Before writing or editing any code, use `read_file` to load each `/docs` file that applies to the task. Do NOT skip this step — the files contain rules that override general defaults:

| File | Covers |
|---|---|
| [docs/auth.md](docs/auth.md) | Clerk auth, protected routes, modal sign-in/sign-up, homepage redirect |
| [docs/ui-components.md](docs/ui-components.md) | shadcn/ui usage, adding components, composing UI — no custom components |

---

## Quick Rules (apply workspace-wide)

- **ALWAYS read the relevant `/docs` files with `read_file` before generating any code** — this is non-negotiable.
- Never install a new dependency without confirming it isn't already provided by an existing package.
- Never commit secrets, `.env` files, or credentials.
- Prefer editing existing files over creating new ones.
- Run `npm run lint` and `npm run build` inside `linkshortnerproject/` before considering any task complete.
- All new code must be TypeScript-strict-compliant (`"strict": true`).
