---
name: portfolio_jl_ts-architecture
description: A living map of the project structure, modules, and data flow. Read this to navigate. UPDATE THIS when adding files/modules.
---

# portfolio_jl_ts Architecture Map

This file documents the high-level structure of the application.

## High-Level Directory Tree

- `src/`
  - `app/` - Application bootstrap, global styles, router, providers
    - `App.vue` - Root app shell with page transitions and scroll reveal
    - `main.ts` - Entry point (createApp, plugins, mount)
    - `styles/base.css` - Catppuccin Frappe/Mocha theme tokens
    - `router/index.ts` - Single route: HomePage
  - `pages/` - Page-level compositions for routes
    - `HomePage.vue` - Assembles all feature sections
  - `widgets/` - Complex reusable layout components
    - `SiteHeader.vue` - Sticky nav, mobile drawer, scroll progress, active section
    - `SiteFooter.vue` - Minimal footer with back-to-top
  - `features/` - Self-contained business features (model + UI)
    - `hero/ui/HeroSection.vue`
    - `about/ui/AboutSection.vue`
    - `skills/ui/SkillsSection.vue`
    - `projects/ui/ProjectsSection.vue`
    - `experience/ui/ExperienceSection.vue`
    - `languages/ui/LanguagesSection.vue`
    - `testimonials/ui/TestimonialsSection.vue`
    - `blog/ui/BlogSection.vue`
    - `contact/ui/ContactSection.vue`
  - `entities/` - Domain models and types
    - `profile/model/`
      - `Profile.ts` - Singleton with resume data
      - `ProgrammingLanguage.ts`
      - `Hobby.ts`
      - `Experience.ts`
      - `Testimonial.ts`
      - `BlogPost.ts`
    - `project/model/types.ts` - GitHubRepo type
  - `shared/` - Cross-cutting utilities, UI primitives, config
    - `ui/` - `AppButton.vue`, `AppCard.vue`, `SectionHeader.vue`, `AppChip.vue`, `AppTag.vue`
    - `lib/utils.ts` - `formatDate`, `useScrollReveal`
    - `config/i18n.ts` - Vue-i18n with 4 locales
    - `config/locales/` - `en.json`, `de.json`, `fr.json`, `it.json`
  - `components/` - Remaining legacy reusable components
    - `AvatarComponent.vue`
    - `icons/`
  - `assets/` - Global styles and static assets
    - `base.css` (legacy, preserved)
    - `main.css` (legacy, preserved)
    - `logo.svg`
  - `stores/` - Pinia stores

## Key Modules & Responsibilities

- **pages/**: Route-level composition. Only HomePage exists.
- **widgets/**: Complex UI blocks shared across pages (header, footer).
- **features/**: Each section is a self-contained module with its own UI and domain data.
- **entities/**: Typed domain models. Profile is a singleton holding all resume data.
- **shared/**: Cross-cutting concerns — UI primitives, utilities, i18n configuration.
- **app/**: Bootstrap layer — main.ts, App.vue, router, global styles.

## Data Flow

Router -> Page -> Widgets -> Features -> Entities. Shared state via Profile singleton. i18n messages loaded from JSON files.
