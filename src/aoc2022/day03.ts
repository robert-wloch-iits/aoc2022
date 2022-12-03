interface Rucksack {
  compartments: string[]
}

export function parseInput(input: string): Rucksack[] {
  const inputAsArray = input?.trim() ? input.trim().split('\n') : []
  const result: Rucksack[] = []
  return result
}
