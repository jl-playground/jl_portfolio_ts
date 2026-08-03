import { Hobby } from './Hobby'
import { ProgrammingLanguage } from './ProgrammingLanguage'
import { ExperienceEntry } from './Experience'

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
    private experiences: ExperienceEntry[]
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
      new ProgrammingLanguage('C++', 'Intermediate', 2, 4, ['valhalla-routing-extension'], 'C++ routing engine extension (Valhalla)', 'Languages'),
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
          'SpotPilot: Fullstack conception and rollout of navigation and dispatch web applications.',
          'Argus: GPS infrastructure and data processing server optimization (+40% processing speed, −20% fleet downtime).',
          'Hardware Integration: Teltonika and Queclink GPS device integration with custom routing engines.',
          'Emergency Vehicle Routing: C++ Valhalla routing engine extension for priority routing.',
          'Leadership & QA: Mentoring interns, code review leadership (+25% code quality improvement).'
        ],
        techStack: ['Node.js', 'Vue.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'TypeScript', 'C++']
      }),
      new ExperienceEntry({
        company: 'EvoSys AG',
        role: 'Fullstack Software Engineer (Internship)',
        startDate: '2024-02-01',
        endDate: '2025-08-01',
        description: [
          'Mobile Flutter/Dart: Development of cross-platform mobile applications.',
          'Fullstack Vue/Node: Feature expansion of existing web applications.',
          'Frontend UX/UI: Technical implementation of design specifications.',
          'QA/Production: Systematic debugging, production bug fixing, and software testing.',
          'Agile/Code Reviews: Participation in sprint planning and peer code reviews.'
        ],
        techStack: ['Flutter', 'Dart', 'Vue.js', 'Node.js', 'SQLite']
      }),
      new ExperienceEntry({
        company: 'Loder AG',
        role: 'Plumber (EFZ)',
        startDate: '2021-08-01',
        endDate: '2023-12-01',
        location: 'Bern, Switzerland',
        description: [
          'Independent project management and client support.',
          'Hands-on technical problem solving and precision work.'
        ],
        techStack: ['Project Management', 'Client Relations']
      })
    ]

    this.instance = new Profile(
      'Joel Leimbacher',
      'Fullstack Software Engineer',
      'Full Stack Software Engineer with proven experience from system architecture to rollout. Specializing in Node.js, Vue.js, and Flutter. Develops high-performance microservices and scalable applications with a focus on clean code and real functional value. Currently building production systems at EvoSys AG.',
      [
        'Microservices Architecture',
        'Fullstack Development',
        'Mobile Development (Flutter)',
        'Container Orchestration (Docker/K8s)',
        'GPS/Geospatial Systems',
        'C++ Routing Engines',
        'Hardware Integration',
        'Code Review & Mentoring'
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
      experiences
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
}
