# Architecture Map

This file tracks the project structure and architectural decisions.

## High-Level Tree

- `src/`
  - `assets/` - Global styles and static assets
  - `components/` - Reusable UI components
  - `models/` - TypeScript models and interfaces
  - `router/` - Route definitions
  - `stores/` - Pinia stores
  - `views/` - Page-level views
  - `App.vue`
  - `main.ts`

## Architecture Notes

- Component-based SPA with Vue 3 + Vite.
- Routing is handled in `src/router/index.ts`.
- Global state uses Pinia in `src/stores/`.
