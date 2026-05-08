export interface BlogPostData {
  slug: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  date: string
  readTimeMinutes: number
  coverImage?: string
}

export class BlogPost {
  constructor(private data: BlogPostData) {}

  getSlug(): string { return this.data.slug }
  getTitle(): string { return this.data.title }
  getExcerpt(): string { return this.data.excerpt }
  getContent(): string { return this.data.content }
  getTags(): string[] { return this.data.tags }
  getDate(): string { return this.data.date }
  getReadTime(): number { return this.data.readTimeMinutes }
  getCoverImage(): string | undefined { return this.data.coverImage }
}
