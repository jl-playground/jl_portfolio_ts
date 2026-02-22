import { createI18n } from 'vue-i18n'

const supportedLocales = ['en', 'de', 'fr', 'it'] as const
type SupportedLocale = (typeof supportedLocales)[number]

const normalizeLocale = (value: string) => value.toLowerCase().split('-')[0]

const getDefaultLocale = (): SupportedLocale => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'en'
  }

  const stored = window.localStorage.getItem('locale')
  if (stored) {
    const normalizedStored = normalizeLocale(stored)
    if (supportedLocales.includes(normalizedStored as SupportedLocale)) {
      return normalizedStored as SupportedLocale
    }
  }

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const language of languages) {
    const normalized = normalizeLocale(language)
    if (supportedLocales.includes(normalized as SupportedLocale)) {
      return normalized as SupportedLocale
    }
  }

  return 'en'
}

const messages = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      languages: 'Languages',
      contact: 'Contact',
      themeToggle: 'Toggle dark mode',
      languageLabel: 'Language'
    },
    theme: {
      light: 'Light',
      dark: 'Dark'
    },
    hero: {
      eyebrow: 'Portfolio',
      description:
        'I design and build thoughtful digital products across web, mobile, and backend systems.',
      primaryCta: 'View Projects',
      secondaryCta: 'Start a Project',
      availabilityLabel: 'Contact',
      availabilityTitle: 'Available for new work'
    },
    about: {
      title: 'About',
      subtitle: 'Crafting thoughtful experiences across web, mobile, and backend systems.',
      focusTitle: 'Focus',
      focusBody:
        'I build reliable products with an emphasis on performance, clean interfaces, and maintainable systems.',
      approachTitle: 'Approach',
      approachBody:
        'From design systems to scalable APIs, I care about the details that make experiences feel effortless.',
      currentTitle: 'Currently',
      currentBody:
        'Exploring new opportunities and building a Flutter app while collaborating on production-ready teams.'
    },
    skills: {
      title: 'Core Skills',
      subtitle: 'Technical strengths and focus areas across the stack.'
    },
    projects: {
      title: 'Selected Projects',
      subtitle: 'Top GitHub repositories, ranked by stars and recent activity.',
      error: 'Unable to load GitHub projects right now.',
      noDescription: 'No description provided.',
      view: 'View on GitHub',
      updated: 'Updated {date}'
    },
    languages: {
      title: 'Languages',
      subtitle: 'Depth across multiple ecosystems and platforms.',
      experience: '{years} years experience',
      projects: 'Projects: {projects}'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Open to collaborations, freelance, and full-time roles.',
      cardTitle: 'Let us build something thoughtful.',
      cardBody: 'Based in Switzerland, available remotely for global teams.',
      email: 'Email me',
      website: 'Visit website'
    },
    footer: {
      role: 'Fullstack Engineer'
    }
  },
  de: {
    nav: {
      about: 'Ueber mich',
      skills: 'Skills',
      projects: 'Projekte',
      languages: 'Sprachen',
      contact: 'Kontakt',
      themeToggle: 'Dark Mode umschalten',
      languageLabel: 'Sprache'
    },
    theme: {
      light: 'Hell',
      dark: 'Dunkel'
    },
    hero: {
      eyebrow: 'Portfolio',
      description:
        'Ich entwerfe und entwickle durchdachte digitale Produkte fuer Web, Mobile und Backend.',
      primaryCta: 'Projekte ansehen',
      secondaryCta: 'Projekt starten',
      availabilityLabel: 'Kontakt',
      availabilityTitle: 'Verfuegbar fuer neue Projekte'
    },
    about: {
      title: 'Ueber mich',
      subtitle: 'Durchdachte Erfahrungen fuer Web, Mobile und Backend.',
      focusTitle: 'Fokus',
      focusBody:
        'Ich baue verlaessliche Produkte mit Fokus auf Performance, klare Interfaces und wartbare Systeme.',
      approachTitle: 'Vorgehen',
      approachBody:
        'Von Designsystemen bis skalierbaren APIs achte ich auf Details, die Erfahrungen muhelos machen.',
      currentTitle: 'Aktuell',
      currentBody:
        'Ich suche neue Chancen und entwickle eine Flutter App mit produktionsreifen Teams.'
    },
    skills: {
      title: 'Kernkompetenzen',
      subtitle: 'Technische Staerken und Schwerpunkte ueber den Stack hinweg.'
    },
    projects: {
      title: 'Ausgewaehlte Projekte',
      subtitle: 'Top GitHub Repositories nach Stars und Aktualitaet sortiert.',
      error: 'GitHub Projekte konnten nicht geladen werden.',
      noDescription: 'Keine Beschreibung vorhanden.',
      view: 'Auf GitHub ansehen',
      updated: 'Aktualisiert {date}'
    },
    languages: {
      title: 'Sprachen',
      subtitle: 'Erfahrung ueber mehrere Oekosysteme und Plattformen.',
      experience: '{years} Jahre Erfahrung',
      projects: 'Projekte: {projects}'
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Offen fuer Kooperationen, Freelance und Vollzeit.',
      cardTitle: 'Lass uns etwas Gutes bauen.',
      cardBody: 'In der Schweiz ansaessig, remote fuer globale Teams verfuegbar.',
      email: 'E-Mail schreiben',
      website: 'Webseite besuchen'
    },
    footer: {
      role: 'Fullstack Engineer'
    }
  },
  fr: {
    nav: {
      about: 'A propos',
      skills: 'Competences',
      projects: 'Projets',
      languages: 'Langages',
      contact: 'Contact',
      themeToggle: 'Basculer en mode sombre',
      languageLabel: 'Langue'
    },
    theme: {
      light: 'Clair',
      dark: 'Sombre'
    },
    hero: {
      eyebrow: 'Portfolio',
      description: 'Je conçois et construis des produits numeriques sur le web, mobile et backend.',
      primaryCta: 'Voir les projets',
      secondaryCta: 'Demarrer un projet',
      availabilityLabel: 'Contact',
      availabilityTitle: 'Disponible pour de nouveaux projets'
    },
    about: {
      title: 'A propos',
      subtitle: 'Des experiences soignees pour le web, le mobile et le backend.',
      focusTitle: 'Focus',
      focusBody:
        'Je construis des produits fiables en mettant l accent sur la performance, des interfaces claires et des systemes maintenables.',
      approachTitle: 'Approche',
      approachBody:
        'Des design systems aux API evolutives, je soigne les details qui rendent l experience fluide.',
      currentTitle: 'Actuellement',
      currentBody:
        'J explore de nouvelles opportunites et je construis une application Flutter avec des equipes experimentees.'
    },
    skills: {
      title: 'Competences',
      subtitle: 'Forces techniques et domaines cles a travers le stack.'
    },
    projects: {
      title: 'Projets selectionnes',
      subtitle: 'Principaux repos GitHub tries par etoiles et activite recente.',
      error: 'Impossible de charger les projets GitHub.',
      noDescription: 'Aucune description disponible.',
      view: 'Voir sur GitHub',
      updated: 'Mis a jour {date}'
    },
    languages: {
      title: 'Langages',
      subtitle: 'Experience a travers plusieurs ecosystèmes et plateformes.',
      experience: '{years} ans experience',
      projects: 'Projets : {projects}'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Ouvert aux collaborations, freelance et temps plein.',
      cardTitle: 'Construisons quelque chose de solide.',
      cardBody: 'Base en Suisse, disponible a distance pour des equipes internationales.',
      email: 'M ecrire',
      website: 'Visiter le site'
    },
    footer: {
      role: 'Fullstack Engineer'
    }
  },
  it: {
    nav: {
      about: 'Chi sono',
      skills: 'Competenze',
      projects: 'Progetti',
      languages: 'Linguaggi',
      contact: 'Contatto',
      themeToggle: 'Attiva modalita scura',
      languageLabel: 'Lingua'
    },
    theme: {
      light: 'Chiaro',
      dark: 'Scuro'
    },
    hero: {
      eyebrow: 'Portfolio',
      description:
        'Progetto e sviluppo prodotti digitali per web, mobile e backend con cura dei dettagli.',
      primaryCta: 'Vedi progetti',
      secondaryCta: 'Inizia un progetto',
      availabilityLabel: 'Contatto',
      availabilityTitle: 'Disponibile per nuovi progetti'
    },
    about: {
      title: 'Chi sono',
      subtitle: 'Esperienze curate per web, mobile e backend.',
      focusTitle: 'Focus',
      focusBody:
        'Creo prodotti affidabili con attenzione a performance, interfacce pulite e sistemi mantenibili.',
      approachTitle: 'Approccio',
      approachBody:
        'Dai design system alle API scalabili, curo i dettagli che rendono l esperienza fluida.',
      currentTitle: 'Ora',
      currentBody: 'Sto esplorando nuove opportunita e costruendo una app Flutter con team esperti.'
    },
    skills: {
      title: 'Competenze chiave',
      subtitle: 'Forza tecnica e focus lungo tutto lo stack.'
    },
    projects: {
      title: 'Progetti selezionati',
      subtitle: 'Repository GitHub migliori per stelle e attivita recente.',
      error: 'Impossibile caricare i progetti GitHub.',
      noDescription: 'Nessuna descrizione disponibile.',
      view: 'Apri su GitHub',
      updated: 'Aggiornato {date}'
    },
    languages: {
      title: 'Linguaggi',
      subtitle: 'Esperienza su diversi ecosistemi e piattaforme.',
      experience: '{years} anni di esperienza',
      projects: 'Progetti: {projects}'
    },
    contact: {
      title: 'Contatto',
      subtitle: 'Aperto a collaborazioni, freelance e full time.',
      cardTitle: 'Creiamo qualcosa di solido.',
      cardBody: 'In Svizzera, disponibile da remoto per team globali.',
      email: 'Scrivimi',
      website: 'Visita il sito'
    },
    footer: {
      role: 'Fullstack Engineer'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages
})

export default i18n
