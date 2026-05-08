export interface TestimonialData {
  quote: string
  author: string
  role: string
  company: string
  avatar?: string
}

export class Testimonial {
  constructor(private data: TestimonialData) {}

  getQuote(): string { return this.data.quote }
  getAuthor(): string { return this.data.author }
  getRole(): string { return this.data.role }
  getCompany(): string { return this.data.company }
  getAvatar(): string | undefined { return this.data.avatar }
}
