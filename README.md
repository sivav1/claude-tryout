# Prism — Analytics Dashboard

An Angular 19 analytics dashboard built as a practical exploration of **AI-assisted development workflows** using [Aider](https://aider.chat) and open-source LLMs. The goal wasn't just to build a dashboard — it was to learn where AI genuinely accelerates development, and where it needs careful human oversight before anything ships.

## Built with Aider AI

This project was developed using a structured AI-assisted workflow throughout the SDLC — not just for autocomplete, but for architectural scaffolding, component generation, and iterative refinement.

### How Aider was used

| Phase | What AI did | What I owned |
| --- | --- | --- |
| **Project initialisation** | Generated the initial Angular scaffold, routing config, and environment setup from structured prompts | Reviewed all output, corrected module structure, validated conventions |
| **Component generation** | Generated boilerplate for feature components, lazy routes, and shared directives | Ensured consistency with established patterns, refactored where AI missed context |
| **Architecture scaffolding** | Proposed the core/features/shared separation and barrel export pattern | Made final architectural decisions, validated against Angular best practices |
| **Styling** | Generated initial SCSS structure and Material theme config | Adjusted for accessibility and visual consistency |

### Prompt engineering approach

Prompts were structured to include:
- Explicit constraints (standalone components only, no NgModules)
- Existing conventions the AI needed to respect (naming, folder structure)
- Expected output format to reduce post-generation cleanup

Vague prompts produced generic, inconsistent code. Specific, constrained prompts produced output that required minimal rework. The git history reflects the iterative prompt → review → refine loop throughout.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Angular 19 (standalone components) |
| UI library | Angular Material (dark theme) |
| Charts | Chart.js via ng2-charts |
| Styling | SCSS + CSS custom properties |
| Fonts | Space Grotesk + DM Mono |

## Project structure

```
src/
├── environments/
│   ├── environment.ts          # Dev config (apiUrl, appName, …)
│   └── environment.prod.ts     # Production config
│
└── app/
    ├── app.component.ts        # Root shell (sidenav layout)
    ├── app.config.ts           # Bootstrap: router, HttpClient, interceptors
    ├── app.routes.ts           # Top-level lazy routes
    │
    ├── core/                   # Singleton, app-wide concerns
    │   ├── guards/
    │   │   └── auth.guard.ts
    │   ├── interceptors/
    │   │   ├── auth.interceptor.ts   # Attaches Bearer token
    │   │   └── error.interceptor.ts  # Global 401 / 5xx handling
    │   ├── services/
    │   │   └── auth.service.ts
    │   ├── layout/
    │   │   ├── header/
    │   │   │   └── header.component.ts
    │   │   └── sidebar/
    │   │       └── sidebar.component.ts
    │   └── index.ts            # Barrel export
    │
    ├── features/               # One folder per route / domain
    │   ├── dashboard/
    │   │   ├── components/
    │   │   │   ├── kpi-cards.component.ts
    │   │   │   └── charts.component.ts
    │   │   ├── analytics.service.ts  # Feature-scoped data service
    │   │   ├── dashboard.component.ts
    │   │   └── dashboard.routes.ts   # Lazy child routes
    │   ├── analytics/
    │   │   ├── analytics.component.ts
    │   │   └── analytics.routes.ts
    │   ├── reports/
    │   │   ├── reports.component.ts
    │   │   └── reports.routes.ts
    │   └── users/
    │       ├── users.component.ts
    │       └── users.routes.ts
    │
    └── shared/                 # Reusable across features
        ├── components/         # Shared UI components
        ├── directives/
        │   └── click-outside.directive.ts
        ├── pipes/
        │   └── truncate.pipe.ts
        ├── models/
        │   └── index.ts        # All domain interfaces/types
        ├── utils/
        │   └── format.utils.ts # Pure helper functions
        └── index.ts            # Barrel export
```

## Getting started

```bash
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200).

## Key conventions

| Rule | Why |
|---|---|
| One feature = one folder under `features/` | Clear ownership, easy to delete or extract |
| `core/` is singleton only | Guards, interceptors, layout — never imported by features |
| `shared/` has no side-effects | Pure components, pipes, directives — no services |
| Lazy-load every feature route | Smaller initial bundle |
| Barrel `index.ts` in `core/` and `shared/` | Clean import paths |
| `environment.ts` for all config | Never hard-code URLs |

## Enabling auth

1. Implement `AuthService.login()` / `isLoggedIn()` with real JWT logic
2. Uncomment `canActivate: [authGuard]` lines in `app.routes.ts`
3. Set `environment.apiUrl` to your real API

## Build

```bash
ng build           # production
ng build --watch   # development watch
```

## Roadmap

This is phase 1 of an ongoing build. Planned next phases:

- **Branching strategy** — introduce feature branches, PR workflow, and branch protection rules to simulate a real team development process
- **Backend API** — custom REST API (Node.js / .NET) to replace mock data, with auth endpoints and JWT handling
- **NgRx state management** — introduce store, actions, reducers, and effects for scalable state across features
- **Testing** — unit tests for services and components, e2e with Playwright
- **CI/CD** — GitHub Actions pipeline for lint, test, and build on PR

