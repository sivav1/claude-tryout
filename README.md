# Prism — Analytics Dashboard

Angular 19 analytics dashboard with Angular Material, standalone components, lazy-loaded feature routes, and HTTP interceptors.

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
