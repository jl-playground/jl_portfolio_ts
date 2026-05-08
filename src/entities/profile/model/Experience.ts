export interface WorkExperience {
  company: string
  role: string
  startDate: string
  endDate: string | null
  description: string[]
  techStack: string[]
  location?: string
}

export class ExperienceEntry {
  constructor(
    private data: WorkExperience
  ) {}

  getCompany(): string { return this.data.company }
  getRole(): string { return this.data.role }
  getStartDate(): string { return this.data.startDate }
  getEndDate(): string | null { return this.data.endDate }
  getDescription(): string[] { return this.data.description }
  getTechStack(): string[] { return this.data.techStack }
  getLocation(): string | undefined { return this.data.location }

  getDuration(): string {
    const start = new Date(this.data.startDate)
    const end = this.data.endDate ? new Date(this.data.endDate) : new Date()
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    if (years === 0) return `${remainingMonths}mo`
    if (remainingMonths === 0) return `${years}yr`
    return `${years}yr ${remainingMonths}mo`
  }
}
