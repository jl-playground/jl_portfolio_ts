export interface BlogPostSummary {
  title: string
  url: string
  slug: string
  excerpt: string
  date: string // YYYY-MM-DD
  tags: string[]
  featureImage: string | null
  readTimeMinutes: number | null
}
