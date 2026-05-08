export class Hobby {
  constructor(
    private name: string,
    private description: string,
    private yearsOfExperience: number
  ) {}

  getName(): string {
    return this.name
  }

  getDescription(): string {
    return this.description
  }

  getYearsOfExperience(): number {
    return this.yearsOfExperience
  }
}
