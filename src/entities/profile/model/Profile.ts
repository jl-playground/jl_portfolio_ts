import { Hobby } from './Hobby'
import { ProgrammingLanguage } from './ProgrammingLanguage'
import { ExperienceEntry } from './Experience'
import { BlogPost } from './BlogPost'
import type { GitHubRepo } from '@/entities/project/model/types'

export class Profile {
  private static instance: Profile | null = null

  private constructor(
    private name: string,
    private title: string,
    private about: string,
    private skills: string[],
    private languages: ProgrammingLanguage[],
    private hobbies: Hobby[],
    private contact: { email: string; phone?: string; website?: string; github?: string; linkedin?: string },
    private experiences: ExperienceEntry[],
    private blogPosts: BlogPost[],
    private projects: GitHubRepo[]
  ) {}

  public static getInstance(): Profile {
    if (this.instance !== null) return this.instance

    const hobbies = [
      new Hobby('Photography', 'Capturing moments and exploring creative compositions', 3),
      new Hobby('Hiking', 'Enjoying nature and staying active', 2),
      new Hobby('Gaming', 'Competitive and strategic gameplay', 4),
      new Hobby('Open Source', 'Contributing to and maintaining open source projects', 2)
    ]

    const languages = [
      new ProgrammingLanguage('JavaScript', 'Expert', 4, 8, ['inventory-tracker', 'express-websocket-gateway', 'chrome-extension-bookmarker', 'real-time-chat-dashboard', 'node-cli-toolkit', 'vanilla-js-games'], 'Proficient with React, Node.js, Vue.js', 'Languages'),
      new ProgrammingLanguage('TypeScript', 'Expert', 4, 8, ['vue-design-system', 'nestjs-cms-api', 'electron-task-manager', 'nextjs-ecommerce', 'react-native-chat', 'type-safe-utils', 'ts-node-boilerplate'], 'Strong typing and OOP concepts in web development', 'Languages'),
      new ProgrammingLanguage('Dart', 'Expert', 4, 7, ['field-inspection-app', 'flutter-expense-tracker', 'flutter-social-feed', 'cross-platform-portfolio', 'dart-pub-packages'], 'Skilled in Flutter framework', 'Languages'),
      new ProgrammingLanguage('Python', 'Advanced', 2, 6, ['ml-image-classifier', 'python-data-pipeline', 'flask-rest-api', 'django-blog-engine', 'py-automation-scripts', 'pandas-report-generator'], 'Experienced with Pandas, Scikit-learn, TensorFlow', 'Languages'),
      new ProgrammingLanguage('Java', 'Intermediate', 2, 5, ['spring-auth-service', 'spring-boot-ecommerce', 'java-cli-file-organizer', 'gradle-build-plugins', 'jvm-performance-lab'], 'Good knowledge of Spring Framework and Hibernate', 'Languages'),
      new ProgrammingLanguage('Kotlin', 'Intermediate', 2, 4, ['kotlin-android-weather', 'kotlin-notes-app', 'ktor-microservice-template', 'compose-desktop-demo'], 'Experience with Android development', 'Languages'),
      new ProgrammingLanguage('Rust', 'Intermediate', 1, 4, ['geodata-processor', 'rust-cli-password-manager', 'rust-tcp-chat-server', 'wasm-rust-image-processor'], 'Strong understanding of memory safety and concurrency', 'Languages'),
      new ProgrammingLanguage('Go', 'Beginner', 1, 2, ['go-task-queue', 'go-url-shortener'], 'Basic knowledge of Go routines and channels', 'Languages'),
      new ProgrammingLanguage('C#', 'Intermediate', 1, 3, ['dotnet-wpf-dashboard', 'wpf-image-gallery', 'aspnet-core-web-api'], 'Experience with .NET framework and WPF', 'Languages'),
      new ProgrammingLanguage('Lua', 'Expert', 3, 7, ['lua-game-framework', 'lua-rest-api-client', 'lua-config-loader', 'neovim-config-repo', 'corona-sdk-prototypes'], 'Experience with game engines like Corona SDK and Love2D', 'Languages')
    ]

    const experiences = [
      new ExperienceEntry({
        company: 'EvoSys AG',
        role: 'Fullstack Software Engineer',
        startDate: '2025-08-01',
        endDate: null,
        location: 'Bern, Switzerland',
        description: [
          'Conception and fullstack realization of web applications from architecture to rollout.',
          'Backend & Microservices: Design and implementation of performant backend services including a custom routing & tracking server based on Node.js for geodata processing.',
          'Fullstack implementation: Development of scalable features with Node.js and Vue.js including database design and API interfaces.',
          'Mentoring of interns and ensuring code quality through regular code reviews.'
        ],
        techStack: ['Node.js', 'Vue.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'TypeScript']
      }),
      new ExperienceEntry({
        company: 'EvoSys AG',
        role: 'Fullstack Software Engineer (Internship)',
        startDate: '2024-02-01',
        endDate: '2025-08-01',
        location: 'Bern, Switzerland',
        description: [
          'Mobile & Web Development: Participation in the development of mobile apps (Flutter/Dart).',
          'Feature Extension: Functional expansion of existing applications (Vue.js / Node.js) to optimize customer processes.',
          'Frontend Implementation: Technical realization of UX/UI specifications to directly improve usability.',
          'Support & Quality: Systematic error analysis (debugging), fixing bugs in production, and conducting software tests.'
        ],
        techStack: ['Flutter', 'Dart', 'Vue.js', 'Node.js', 'SQLite']
      })
    ]

    const blogPosts = [
      new BlogPost({
        slug: 'rust-memory-safety',
        title: 'Why Rust Changed How I Think About Memory Safety',
        excerpt: 'After years of working with garbage-collected languages, learning Rust forced me to reconsider everything I thought I knew about memory management. Here is what I discovered.',
        content: `## The Ownership Model

Rust's ownership system is the single most important concept I have encountered in systems programming. Unlike JavaScript or Python where memory is managed automatically, Rust forces you to think about who owns a piece of data at every single moment.

**Ownership has three simple rules:**
- Each value has a single owner
- When the owner goes out of scope, the value is dropped
- Ownership can be transferred (moved) or borrowed (referenced)

### Borrowing vs Moving

In garbage-collected languages, we pass references everywhere without thinking. Rust makes this explicit. You must choose between:
- \`\&T\` — an immutable borrow (many readers)
- \`\&mut T\` — a mutable borrow (one writer)
- Moving the value entirely (transferring ownership)

## Why It Matters in Production

At EvoSys AG, we process large geospatial datasets. Memory leaks in long-running Node.js services were a recurring issue. After experimenting with a Rust-based microservice for data ingestion, memory usage became completely predictable. No spikes, no gradual growth, no GC pauses.

## The Learning Curve

Rust's compiler is famously strict. I spent weeks fighting the borrow checker. But once the mental model clicked, I started writing safer code in *every* language. I now think about lifetimes and mutation boundaries even in TypeScript.

> "The borrow checker is not your enemy. It is a pair programmer who never gets tired."

## Getting Started

If you are curious, I recommend:
1. [The Rust Book](https://doc.rust-lang.org/book/) — free and comprehensive
2. [Rustlings](https://github.com/rust-lang/rustlings) — hands-on exercises
3. Build a small CLI tool as your first project

Rust will not replace every tool in your stack, but it will change how you think about reliability.`,
        tags: ['Rust', 'Systems Programming', 'Memory Safety'],
        date: '2025-03-15',
        readTimeMinutes: 8
      }),
      new BlogPost({
        slug: 'ml-flutter-integration',
        title: 'Integrating Machine Learning Models into Flutter Apps',
        excerpt: 'Bringing ML to mobile does not have to be painful. I share my approach to running TensorFlow Lite models inside a Flutter application with minimal overhead.',
        content: `## The Challenge

Mobile ML is tricky. You need low latency, small model size, and reasonable accuracy — pick two, right? At EvoSys AG, we needed on-device image classification for a field-inspection app. Sending every photo to the server was too slow and expensive.

## TensorFlow Lite + Flutter

TensorFlow Lite is the go-to for on-device inference. The \`tflite\` and \`tflite_flutter\` packages make integration straightforward.

### Model Optimization

Before touching Flutter code, optimize your model:
- **Quantization** — convert \`float32\` weights to \`int8\`. Reduces size by ~4x with minimal accuracy loss.
- **Pruning** — remove redundant connections. Can cut size by 50%.
- **Knowledge distillation** — train a small "student" model to mimic a large "teacher".

### Integration Pattern

1. Bundle the \`.tflite\` model as an asset
2. Load it on app startup (or lazily on first use)
3. Preprocess camera frames into the expected input tensor
4. Run inference and post-process results

## Performance Tips

- Use **\`compute\` isolates** in Flutter so inference does not block the UI thread
- Cache preprocessed inputs when possible
- Profile with **Dart DevTools** to catch jank from heavy operations

## Results

Our optimized MobileNetV2 model runs at ~45ms per frame on a mid-range Android device. That is 22 fps — more than enough for real-time feedback.

## Resources

- [TensorFlow Lite Flutter Plugin](https://pub.dev/packages/tflite_flutter)
- [ML Kit for Flutter](https://pub.dev/packages/google_ml_kit) — for common tasks like text recognition
- [Edge Impulse](https://edgeimpulse.com/) — great for tinyML prototyping`,
        tags: ['Flutter', 'Machine Learning', 'TensorFlow', 'Dart'],
        date: '2025-01-20',
        readTimeMinutes: 12
      }),
      new BlogPost({
        slug: 'building-scalable-vue-apps',
        title: 'Lessons from Building Scalable Vue.js Applications',
        excerpt: 'After shipping multiple production Vue apps, I have distilled the patterns that actually matter for long-term maintainability at scale.',
        content: `## Feature-Sliced Design

The biggest architectural improvement I made was adopting **Feature-Sliced Design (FSD)**. Instead of organizing by file type (\`components/\`, \`store/\`, \`utils/\`), structure by domain:

- \`features/\` — user-facing capabilities (e.g., auth, checkout)
- \`entities/\` — business objects (e.g., user, product)
- \`shared/\` — reusable infrastructure (UI kit, API client)
- \`widgets/\` — complex compositions of features and entities
- \`pages/\` — route-level views
- \`app/\` — app initialization, providers, styles

This inversion of dependency keeps features isolated and composable.

## State Management That Scales

Pinia is excellent, but the real win is *how* you use it:
- **Store per entity**, not one giant store
- Use **composable stores** for cross-cutting concerns
- Keep stores close to the features they serve

## Component Boundaries

I follow a strict hierarchy:
1. **Atoms** — buttons, inputs, labels (no business logic)
2. **Molecules** — search bar, form row (simple combinations)
3. **Organisms** — feature sections (self-contained)
4. **Templates** — page layouts
5. **Pages** — route components

## Type Safety

TypeScript + Vue 3 is powerful, but you need discipline:
- Define **props interfaces** explicitly
- Use \`defineEmits\` with typed payloads
- Leverage \`\<script setup lang="ts"\>\` for cleaner code

## Testing Strategy

- **Unit tests** for composables and utilities
- **Component tests** with Vue Test Utils
- **E2E tests** for critical user flows only

## Final Thought

Scalability is not about lines of code. It is about **communication**. A clear structure means new team members can ship features on day one without breaking existing code.`,
        tags: ['Vue.js', 'TypeScript', 'Architecture', 'Frontend'],
        date: '2024-11-08',
        readTimeMinutes: 10
      })
    ]

    const projects: GitHubRepo[] = [
      {
        id: 9001,
        name: 'field-inspection-app',
        html_url: 'https://github.com/Jl115/field-inspection-app',
        description: 'Cross-platform Flutter app for on-site data collection with offline sync and TensorFlow Lite image classification.',
        language: 'Dart',
        stargazers_count: 12,
        forks_count: 3,
        updated_at: '2025-04-20T10:00:00Z',
        fork: false,
        archived: false,
        topics: ['flutter', 'tensorflow-lite', 'offline-first', 'geolocation']
      },
      {
        id: 9002,
        name: 'geodata-processor',
        html_url: 'https://github.com/Jl115/geodata-processor',
        description: 'Rust-based microservice for high-performance geospatial data ingestion and routing.',
        language: 'Rust',
        stargazers_count: 8,
        forks_count: 1,
        updated_at: '2025-03-15T14:30:00Z',
        fork: false,
        archived: false,
        topics: ['rust', 'geospatial', 'microservices', 'performance']
      },
      {
        id: 9003,
        name: 'vue-design-system',
        html_url: 'https://github.com/Jl115/vue-design-system',
        description: 'Reusable Vue 3 component library built with TypeScript and Tailwind CSS for enterprise apps.',
        language: 'TypeScript',
        stargazers_count: 24,
        forks_count: 5,
        updated_at: '2025-02-28T09:15:00Z',
        fork: false,
        archived: false,
        topics: ['vue3', 'typescript', 'design-system', 'tailwindcss']
      },
      {
        id: 9004,
        name: 'inventory-tracker',
        html_url: 'https://github.com/Jl115/inventory-tracker',
        description: 'Fullstack Node.js and Vue.js inventory management system with barcode scanning support.',
        language: 'JavaScript',
        stargazers_count: 7,
        forks_count: 2,
        updated_at: '2025-01-10T11:45:00Z',
        fork: false,
        archived: false,
        topics: ['nodejs', 'vuejs', 'inventory', 'barcode']
      },
      {
        id: 9005,
        name: 'ml-image-classifier',
        html_url: 'https://github.com/Jl115/ml-image-classifier',
        description: 'Python scripts and notebooks for training and deploying custom image classification models.',
        language: 'Python',
        stargazers_count: 15,
        forks_count: 4,
        updated_at: '2024-12-05T16:20:00Z',
        fork: false,
        archived: false,
        topics: ['python', 'machine-learning', 'tensorflow', 'computer-vision']
      },
      {
        id: 9006,
        name: 'spring-auth-service',
        html_url: 'https://github.com/Jl115/spring-auth-service',
        description: 'OAuth2 and JWT authentication microservice built with Spring Boot and PostgreSQL.',
        language: 'Java',
        stargazers_count: 18,
        forks_count: 6,
        updated_at: '2024-11-22T08:00:00Z',
        fork: false,
        archived: false,
        topics: ['spring-boot', 'jwt', 'oauth2', 'microservices']
      },
      {
        id: 9007,
        name: 'go-task-queue',
        html_url: 'https://github.com/Jl115/go-task-queue',
        description: 'Lightweight distributed task queue written in Go with Redis-backed persistence and worker pools.',
        language: 'Go',
        stargazers_count: 6,
        forks_count: 1,
        updated_at: '2024-10-18T13:00:00Z',
        fork: false,
        archived: false,
        topics: ['go', 'redis', 'task-queue', 'distributed-systems']
      },
      {
        id: 9008,
        name: 'kotlin-android-weather',
        html_url: 'https://github.com/Jl115/kotlin-android-weather',
        description: 'Native Android weather app using Jetpack Compose, coroutines, and OpenWeatherMap API.',
        language: 'Kotlin',
        stargazers_count: 9,
        forks_count: 2,
        updated_at: '2024-09-30T07:45:00Z',
        fork: false,
        archived: false,
        topics: ['kotlin', 'android', 'jetpack-compose', 'weather']
      },
      {
        id: 9009,
        name: 'dotnet-wpf-dashboard',
        html_url: 'https://github.com/Jl115/dotnet-wpf-dashboard',
        description: 'Desktop analytics dashboard built with WPF and C# featuring real-time charting and data export.',
        language: 'C#',
        stargazers_count: 5,
        forks_count: 1,
        updated_at: '2024-08-12T10:30:00Z',
        fork: false,
        archived: false,
        topics: ['csharp', 'wpf', 'desktop', 'analytics']
      },
      {
        id: 9010,
        name: 'lua-game-framework',
        html_url: 'https://github.com/Jl115/lua-game-framework',
        description: '2D game framework prototype built with Lua and Love2D including physics and scene management.',
        language: 'Lua',
        stargazers_count: 11,
        forks_count: 3,
        updated_at: '2024-07-25T16:00:00Z',
        fork: false,
        archived: false,
        topics: ['lua', 'love2d', 'gamedev', '2d']
      },
      {
        id: 9011,
        name: 'swift-ios-fitness',
        html_url: 'https://github.com/Jl115/swift-ios-fitness',
        description: 'iOS fitness tracking app built with SwiftUI and HealthKit integration for workout analytics.',
        language: 'Swift',
        stargazers_count: 4,
        forks_count: 1,
        updated_at: '2024-06-14T09:20:00Z',
        fork: false,
        archived: false,
        topics: ['swift', 'swiftui', 'ios', 'healthkit']
      },
      {
        id: 9012,
        name: 'react-native-chat',
        html_url: 'https://github.com/Jl115/react-native-chat',
        description: 'Real-time mobile chat application using React Native, Firebase, and TypeScript with end-to-end encryption.',
        language: 'TypeScript',
        stargazers_count: 14,
        forks_count: 4,
        updated_at: '2024-05-08T11:10:00Z',
        fork: false,
        archived: false,
        topics: ['react-native', 'typescript', 'firebase', 'chat']
      },
      {
        id: 9013,
        name: 'nestjs-cms-api',
        html_url: 'https://github.com/Jl115/nestjs-cms-api',
        description: 'Headless CMS REST API built with NestJS, PostgreSQL, and TypeScript featuring role-based access control.',
        language: 'TypeScript',
        stargazers_count: 11,
        forks_count: 2,
        updated_at: '2024-04-22T08:45:00Z',
        fork: false,
        archived: false,
        topics: ['nestjs', 'typescript', 'cms', 'postgresql']
      },
      {
        id: 9014,
        name: 'electron-task-manager',
        html_url: 'https://github.com/Jl115/electron-task-manager',
        description: 'Cross-platform desktop task manager built with Electron and TypeScript using local SQLite storage.',
        language: 'TypeScript',
        stargazers_count: 9,
        forks_count: 3,
        updated_at: '2024-03-30T14:20:00Z',
        fork: false,
        archived: false,
        topics: ['electron', 'typescript', 'desktop', 'sqlite']
      },
      {
        id: 9015,
        name: 'nextjs-ecommerce',
        html_url: 'https://github.com/Jl115/nextjs-ecommerce',
        description: 'Fullstack e-commerce storefront with Next.js, Stripe payments, and Prisma ORM.',
        language: 'TypeScript',
        stargazers_count: 19,
        forks_count: 5,
        updated_at: '2024-02-18T10:00:00Z',
        fork: false,
        archived: false,
        topics: ['nextjs', 'typescript', 'ecommerce', 'stripe']
      },
      {
        id: 9016,
        name: 'express-websocket-gateway',
        html_url: 'https://github.com/Jl115/express-websocket-gateway',
        description: 'Real-time WebSocket gateway for microservices built with Express and Redis pub/sub.',
        language: 'JavaScript',
        stargazers_count: 8,
        forks_count: 2,
        updated_at: '2024-01-25T11:30:00Z',
        fork: false,
        archived: false,
        topics: ['nodejs', 'websocket', 'microservices', 'redis']
      },
      {
        id: 9017,
        name: 'chrome-extension-bookmarker',
        html_url: 'https://github.com/Jl115/chrome-extension-bookmarker',
        description: 'Browser extension for smart bookmarking with tags and full-text search using JavaScript.',
        language: 'JavaScript',
        stargazers_count: 6,
        forks_count: 1,
        updated_at: '2023-12-14T09:15:00Z',
        fork: false,
        archived: false,
        topics: ['javascript', 'chrome-extension', 'bookmarking']
      },
      {
        id: 9018,
        name: 'flutter-expense-tracker',
        html_url: 'https://github.com/Jl115/flutter-expense-tracker',
        description: 'Personal finance tracker built with Flutter and Dart featuring charts and local persistence.',
        language: 'Dart',
        stargazers_count: 7,
        forks_count: 2,
        updated_at: '2023-11-08T13:40:00Z',
        fork: false,
        archived: false,
        topics: ['flutter', 'dart', 'finance', 'charts']
      },
      {
        id: 9019,
        name: 'flutter-social-feed',
        html_url: 'https://github.com/Jl115/flutter-social-feed',
        description: 'Social media feed clone in Flutter with infinite scroll, image caching, and pull-to-refresh.',
        language: 'Dart',
        stargazers_count: 5,
        forks_count: 1,
        updated_at: '2023-10-02T07:20:00Z',
        fork: false,
        archived: false,
        topics: ['flutter', 'dart', 'social', 'ui']
      },
      {
        id: 9020,
        name: 'python-data-pipeline',
        html_url: 'https://github.com/Jl115/python-data-pipeline',
        description: 'ETL data pipeline using Python, Pandas, and Apache Airflow for automated reporting.',
        language: 'Python',
        stargazers_count: 10,
        forks_count: 3,
        updated_at: '2023-09-18T16:10:00Z',
        fork: false,
        archived: false,
        topics: ['python', 'pandas', 'etl', 'airflow']
      },
      {
        id: 9021,
        name: 'flask-rest-api',
        html_url: 'https://github.com/Jl115/flask-rest-api',
        description: 'RESTful API boilerplate with Flask, SQLAlchemy, and JWT authentication in Python.',
        language: 'Python',
        stargazers_count: 13,
        forks_count: 4,
        updated_at: '2023-08-05T10:30:00Z',
        fork: false,
        archived: false,
        topics: ['python', 'flask', 'rest-api', 'jwt']
      },
      {
        id: 9022,
        name: 'spring-boot-ecommerce',
        html_url: 'https://github.com/Jl115/spring-boot-ecommerce',
        description: 'Monolithic e-commerce backend with Spring Boot, JPA, and Stripe integration in Java.',
        language: 'Java',
        stargazers_count: 16,
        forks_count: 5,
        updated_at: '2023-07-22T08:00:00Z',
        fork: false,
        archived: false,
        topics: ['java', 'spring-boot', 'ecommerce', 'jpa']
      },
      {
        id: 9023,
        name: 'java-cli-file-organizer',
        html_url: 'https://github.com/Jl115/java-cli-file-organizer',
        description: 'Command-line file organizer tool built with Java featuring pattern-based sorting.',
        language: 'Java',
        stargazers_count: 4,
        forks_count: 1,
        updated_at: '2023-06-10T12:45:00Z',
        fork: false,
        archived: false,
        topics: ['java', 'cli', 'file-management']
      },
      {
        id: 9024,
        name: 'kotlin-notes-app',
        html_url: 'https://github.com/Jl115/kotlin-notes-app',
        description: 'Offline-first notes app for Android written in Kotlin with Room database and Material Design.',
        language: 'Kotlin',
        stargazers_count: 6,
        forks_count: 2,
        updated_at: '2023-05-28T09:30:00Z',
        fork: false,
        archived: false,
        topics: ['kotlin', 'android', 'room', 'material-design']
      },
      {
        id: 9025,
        name: 'rust-cli-password-manager',
        html_url: 'https://github.com/Jl115/rust-cli-password-manager',
        description: 'Secure command-line password manager in Rust with AES encryption and Argon2 hashing.',
        language: 'Rust',
        stargazers_count: 7,
        forks_count: 1,
        updated_at: '2023-04-15T14:00:00Z',
        fork: false,
        archived: false,
        topics: ['rust', 'cli', 'security', 'encryption']
      },
      {
        id: 9026,
        name: 'rust-tcp-chat-server',
        html_url: 'https://github.com/Jl115/rust-tcp-chat-server',
        description: 'Multi-room TCP chat server built from scratch in Rust using async I/O and Tokio.',
        language: 'Rust',
        stargazers_count: 5,
        forks_count: 1,
        updated_at: '2023-03-08T11:20:00Z',
        fork: false,
        archived: false,
        topics: ['rust', 'tcp', 'async', 'tokio']
      },
      {
        id: 9027,
        name: 'go-url-shortener',
        html_url: 'https://github.com/Jl115/go-url-shortener',
        description: 'High-performance URL shortener service written in Go with BoltDB and base62 encoding.',
        language: 'Go',
        stargazers_count: 4,
        forks_count: 1,
        updated_at: '2023-02-20T08:50:00Z',
        fork: false,
        archived: false,
        topics: ['go', 'url-shortener', 'boltdb']
      },
      {
        id: 9028,
        name: 'wpf-image-gallery',
        html_url: 'https://github.com/Jl115/wpf-image-gallery',
        description: 'Desktop image gallery and editor built with WPF and C# including EXIF metadata handling.',
        language: 'C#',
        stargazers_count: 3,
        forks_count: 1,
        updated_at: '2023-01-12T10:15:00Z',
        fork: false,
        archived: false,
        topics: ['csharp', 'wpf', 'desktop', 'imaging']
      },
      {
        id: 9029,
        name: 'lua-rest-api-client',
        html_url: 'https://github.com/Jl115/lua-rest-api-client',
        description: 'Lightweight REST API client library for Lua with JSON parsing and async callbacks.',
        language: 'Lua',
        stargazers_count: 5,
        forks_count: 2,
        updated_at: '2022-12-05T13:30:00Z',
        fork: false,
        archived: false,
        topics: ['lua', 'rest-api', 'json', 'async']
      },
      {
        id: 9030,
        name: 'lua-config-loader',
        html_url: 'https://github.com/Jl115/lua-config-loader',
        description: 'Hierarchical configuration loader for Lua applications with environment-specific overrides.',
        language: 'Lua',
        stargazers_count: 4,
        forks_count: 1,
        updated_at: '2022-11-18T09:00:00Z',
        fork: false,
        archived: false,
        topics: ['lua', 'config', 'loader']
      },
      {
        id: 9031,
        name: 'swift-todo-list',
        html_url: 'https://github.com/Jl115/swift-todo-list',
        description: 'Simple todo list app for iOS using SwiftUI with Core Data persistence and widget support.',
        language: 'Swift',
        stargazers_count: 3,
        forks_count: 1,
        updated_at: '2022-10-04T07:45:00Z',
        fork: false,
        archived: false,
        topics: ['swift', 'swiftui', 'ios', 'core-data']
      }
    ]

    this.instance = new Profile(
      'Joel Leimbacher',
      'Fullstack Software Engineer',
      'I am a Fullstack Software Engineer with a strong background in application development. My passion for software was fueled by the Young Talents Hackathon and Harvard CS50. I specialize in web, mobile, and backend development with modern technologies like Vue.js, Node.js, Flutter, and Dart. I am currently building production systems at EvoSys AG and mentoring the next generation of developers.',
      [
        'File Management',
        'Swing',
        'GUI Development',
        'Fullstack Development',
        'Cloud Computing',
        'DevOps'
      ],
      languages,
      hobbies,
      {
        email: 'joeel.leimbacher@gmail.com',
        phone: '+41 78 705 86 69',
        website: 'https://joelleimbacher.tech',
        github: 'https://github.com/Jl115',
        linkedin: 'https://www.linkedin.com/in/joel-leimbacher-4a64b1257/'
      },
      experiences,
      blogPosts,
      projects
    )

    return this.instance
  }

  getName(): string { return this.name }
  getTitle(): string { return this.title }
  getAbout(): string { return this.about }
  getSkills(): string[] { return this.skills }
  getLanguages(): ProgrammingLanguage[] { return this.languages }
  getHobbies(): Hobby[] { return this.hobbies }
  getContact(): { email: string; phone?: string; website?: string; github?: string; linkedin?: string } { return this.contact }
  getExperiences(): ExperienceEntry[] { return this.experiences }
  getBlogPosts(): BlogPost[] { return this.blogPosts }
  getProjects(): GitHubRepo[] { return this.projects }
}
