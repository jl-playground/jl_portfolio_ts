import { Hobby } from './Hobby'
import { ProgrammingLanguage } from './ProgrammingLanguage'
import { ExperienceEntry } from './Experience'
import { Testimonial } from './Testimonial'
import { BlogPost } from './BlogPost'

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
    private testimonials: Testimonial[],
    private blogPosts: BlogPost[]
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
      new ProgrammingLanguage('JavaScript', 'Expert', 4, 8, ['E-commerce Platform', 'Real-time Chat'], 'Proficient with React, Node.js, Vue.js', 'Languages'),
      new ProgrammingLanguage('TypeScript', 'Expert', 4, 8, ['Large-scale Web Application'], 'Strong typing and OOP concepts in web development', 'Languages'),
      new ProgrammingLanguage('Dart', 'Expert', 4, 7, ['Cross-platform Mobile App'], 'Skilled in Flutter framework', 'Languages'),
      new ProgrammingLanguage('Python', 'Advanced', 2, 6, ['Data Analysis Tool', 'ML Model'], 'Experienced with Pandas, Scikit-learn, TensorFlow', 'Languages'),
      new ProgrammingLanguage('Java', 'Intermediate', 2, 5, ['Banking System', 'E-commerce Backend'], 'Good knowledge of Spring Framework and Hibernate', 'Languages'),
      new ProgrammingLanguage('Kotlin', 'Intermediate', 2, 4, ['Android Mobile App'], 'Experience with Android development', 'Languages'),
      new ProgrammingLanguage('Rust', 'Intermediate', 1, 4, ['Systems Programming'], 'Strong understanding of memory safety and concurrency', 'Languages'),
      new ProgrammingLanguage('Go', 'Beginner', 1, 2, ['Microservices Project'], 'Basic knowledge of Go routines and channels', 'Languages'),
      new ProgrammingLanguage('C#', 'Intermediate', 1, 3, ['Desktop Application'], 'Experience with .NET framework and WPF', 'Languages'),
      new ProgrammingLanguage('Lua', 'Expert', 3, 7, ['Game Scripting'], 'Experience with game engines like Corona SDK and Love2D', 'Languages')
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

    const testimonials = [
      new Testimonial({
        quote: 'Joel consistently delivers high-quality code and has a remarkable ability to break down complex problems into elegant solutions. His mentorship of our interns has been invaluable.',
        author: 'Thomas Mueller',
        role: 'Tech Lead',
        company: 'EvoSys AG'
      }),
      new Testimonial({
        quote: 'Working with Joel was a game-changer for our team. His fullstack expertise and attention to detail elevated our entire codebase. He is not just a developer, he is a product thinker.',
        author: 'Sarah Weber',
        role: 'Product Manager',
        company: 'EvoSys AG'
      }),
      new Testimonial({
        quote: 'Joel has an incredible work ethic and a passion for learning. During his internship, he quickly became a core contributor and his Flutter skills are exceptional.',
        author: 'Michael Keller',
        role: 'Senior Engineer',
        company: 'EvoSys AG'
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
      testimonials,
      blogPosts
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
  getTestimonials(): Testimonial[] { return this.testimonials }
  getBlogPosts(): BlogPost[] { return this.blogPosts }
}
