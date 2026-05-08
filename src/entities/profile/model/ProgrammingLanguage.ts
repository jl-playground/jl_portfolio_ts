export class ProgrammingLanguage {
  constructor(
    private name: string,
    private proficiency: string,
    private experienceYears: number,
    private skillLevel: number,
    private relevantProjects?: string[],
    private additionalDetails?: string,
    private category?: string
  ) {}

  getName(): string {
    return this.name
  }

  getProficiency(): string {
    return this.proficiency
  }

  getExperienceYears(): number {
    return this.experienceYears
  }

  getSkillLevel(): number {
    return this.skillLevel
  }

  getRelevantProjects(): string[] | undefined {
    return this.relevantProjects
  }

  getAdditionalDetails(): string | undefined {
    return this.additionalDetails
  }

  getCategory(): string | undefined {
    return this.category
  }
}
