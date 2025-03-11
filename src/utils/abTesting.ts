type Variant = 'A' | 'B'
type ExperimentName = string

interface Experiment {
  name: ExperimentName
  variants: {
    A: any
    B: any
  }
}

class ABTesting {
  private experiments: Map<ExperimentName, Experiment> = new Map()

  createExperiment(name: ExperimentName, variantA: any, variantB: any) {
    this.experiments.set(name, {
      name,
      variants: { A: variantA, B: variantB }
    })
  }

  getVariant(experimentName: ExperimentName): Variant {
    const userId = this.getUserId()
    return this.assignVariant(experimentName, userId)
  }

  private getUserId(): string {
    let userId = localStorage.getItem('user_id')
    if (!userId) {
      userId = Math.random().toString(36).substring(2)
      localStorage.setItem('user_id', userId)
    }
    return userId
  }

  private assignVariant(experimentName: ExperimentName, userId: string): Variant {
    const hash = this.hashString(`${experimentName}:${userId}`)
    return hash % 2 === 0 ? 'A' : 'B'
  }

  private hashString(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i)
      hash = hash & hash
    }
    return Math.abs(hash)
  }
}

export const abTesting = new ABTesting() 