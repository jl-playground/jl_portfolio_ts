---
name: portfolio_jl_ts-architecture
description: A living map of the project structure, modules, and data flow. Read this to navigate. UPDATE THIS when adding files/modules.
---

# portfolio_jl_ts Architecture Map

This file documents the high-level structure of the application.

## High-Level Directory Tree

- `src/`
  - `assets/` - Global styles and static assets
    - `base.css`
    - `main.css`
    - `logo.svg`
  - `components/` - Reusable UI components
    - `AboutMe.vue`
    - `AvatarComponent.vue`
    - `NavBar.vue`
    - `icons/`
  - `models/` - TypeScript models and interfaces
    - `Hobbys.ts`
    - `Language.ts`
    - `Profile.ts`
  - `router/` - Route definitions
    - `index.ts`
  - `stores/` - Pinia stores
    - `counter.ts`
  - `views/` - Page-level views
    - `HomeView.vue`
    - `LanguageView.vue`
    - `ProfileView.vue`
  - `App.vue`
  - `main.ts`

## Key Modules & Responsibilities

- **views/**: Page-level composition and layout for routes.
- **components/**: Reusable UI blocks used by views.
- **stores/**: Global state management using Pinia.
- **models/**: Shared TypeScript data models.
- **router/**: Application routes and navigation configuration.
- **assets/**: Global CSS and static assets.

## Data Flow

Router -> View -> Components. Shared state lives in Pinia stores and is typed with models from `models/`.
