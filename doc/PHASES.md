# Portfolio Modernization — Implementation Phases

## Overview
- **Stack:** Vue 3 + Vite + TypeScript + Pinia + Tailwind CSS + PrimeVue
- **Architecture:** Feature-Sliced Design (FSD)
- **Theme:** Catppuccin Frappe (light) / Mocha (dark)

## Phase 1: Foundation — FSD Migration & Theme
1. Create FSD directory structure (`app/`, `pages/`, `widgets/`, `features/`, `entities/`, `shared/`)
2. Set up path aliases in `vite.config.ts` and `tsconfig.app.json`
3. Migrate i18n from monolithic `index.ts` to `shared/config/locales/{en,de,fr,it}.json`
4. Rewrite `app/styles/base.css` with Catppuccin tokens
5. Create `shared/ui/` primitives (`AppButton`, `AppCard`, `SectionHeader`, `AppChip`)
6. Update `app/main.ts`, `app/App.vue`, `router/index.ts`

## Phase 2: Entities & Data Layer
1. Create `entities/profile/model/` with updated models:
   - `Profile.ts` — singleton with resume data
   - `Language.ts` — programming language class
   - `Hobby.ts` — hobby class
   - `Experience.ts` — work experience class (NEW)
   - `Testimonial.ts` — testimonial class (NEW)
   - `BlogPost.ts` — blog post class (NEW)
2. Create `entities/project/model/types.ts` — GitHubRepo type

## Phase 3: Features — Sections
Build each feature as a self-contained module with its own UI + model + i18n keys:

### Hero (`features/hero/`)
- Animated background particles
- Gradient text on name
- Typing animation for subtitle
- Better CTA buttons

### About (`features/about/`)
- Two-column: text + avatar
- Glassmorphism avatar card
- Download CV button

### Experience Timeline (`features/experience/`)
- Vertical alternating timeline
- Work history from resume:
  - EvoSys AG (08/2025–today) — Fullstack Engineer
  - EvoSys AG (02/2024–08/2025) — Fullstack Engineer (Internship)
  - Loder AG (08/2021–12/2023) — Spengler EFZ
- Animated line on scroll

### Skills (`features/skills/`)
- Categorized groups (Languages, Frameworks, Tools)
- Visual proficiency bars
- Radar chart (from old ProfileView)

### Projects (`features/projects/`)
- Filter tabs by language
- Enhanced cards with hover glow
- Proper skeleton loading

### Languages (`features/languages/`)
- Human languages (DE, EN, FR) with proficiency badges
- Programming languages with progress bars

### Testimonials (`features/testimonials/`)
- Fake-but-realistic quotes from colleagues
- Card carousel or grid

### Blog (`features/blog/`)
- 3 fake posts about Rust, Machine Learning, Flutter
- Card layout with read time, date, tags

### Contact (`features/contact/`)
- Social links (GitHub, LinkedIn)
- Copy-to-clipboard email
- Better CTA layout

## Phase 4: Widgets & Pages
1. `widgets/SiteHeader.vue` — sticky nav, mobile drawer, scroll progress, active section
2. `widgets/SiteFooter.vue` — minimal footer
3. `pages/HomePage.vue` — assembles all features in order

## Phase 5: Cleanup & Polish
1. Delete dead files: `stores/counter.ts`, `views/HomeView.vue`, `views/ProfileView.vue`, `views/LanguageView.vue`, `components/NavBar.vue`, `components/AboutMe.vue`
2. Accessibility: reduced motion, focus states, aria labels
3. SEO meta tags
4. Run `npm run type-check` and `npm run lint`
5. Update `portfolio_jl_ts-architecture` skill

## Data Sources
- **Resume:** German CV provided by user
- **Social:** GitHub (Jl115), LinkedIn (joel-leimbacher-4a64b1257)
- **Blog topics:** Rust, Machine Learning, Flutter
- **Testimonials:** Fake but realistic quotes
