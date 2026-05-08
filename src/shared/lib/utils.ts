let observer: IntersectionObserver | null = null
const observedElements = new Set<HTMLElement>()
let initialized = false
let mutationObserver: MutationObserver | null = null

export const scrollReveal = {
  observe(el: HTMLElement) {
    if (!el) return
    el.classList.add('reveal')
    if (initialized && observer) {
      observer.observe(el)
      // Trigger immediate check in case element is already visible
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-visible')
        }
      })
    } else {
      observedElements.add(el)
    }
  },

  init(threshold = 0.12) {
    if (initialized) return
    initialized = true
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold }
    )

    // Observe any elements that were queued before init
    observedElements.forEach((el) => observer?.observe(el))
    observedElements.clear()

    // Auto-pick up any .reveal elements already in the DOM
    document.querySelectorAll('.reveal').forEach((el) => {
      if (el instanceof HTMLElement) {
        observer?.observe(el)
        // Force visible if already in viewport
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-visible')
        }
      }
    })

    // Watch for dynamically added .reveal elements
    mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.classList.contains('reveal')) {
              observer?.observe(node)
              const rect = node.getBoundingClientRect()
              if (rect.top < window.innerHeight && rect.bottom > 0) {
                node.classList.add('is-visible')
              }
            }
            node.querySelectorAll('.reveal').forEach((el) => {
              if (el instanceof HTMLElement) {
                observer?.observe(el)
                const rect = el.getBoundingClientRect()
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                  el.classList.add('is-visible')
                }
              }
            })
          }
        })
      })
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })
  },

  destroy() {
    observer?.disconnect()
    observer = null
    mutationObserver?.disconnect()
    mutationObserver = null
    initialized = false
    observedElements.clear()
  }
}

export function formatDate(value: string, locale: string): string {
  const date = new Date(value)
  return date.toLocaleDateString(locale, { month: 'short', year: 'numeric' })
}

export function formatMonthYear(dateStr: string, locale: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale, { month: 'short', year: 'numeric' })
}

export function useScrollReveal(threshold = 0.12) {
  return {
    observe: scrollReveal.observe,
    init: () => scrollReveal.init(threshold),
    destroy: scrollReveal.destroy
  }
}
