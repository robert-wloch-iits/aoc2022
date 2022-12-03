interface Rucksack {
  compartments: string[][]
}

export function splitInTwoHalves(input: string[]): string[][] {
  let result: string[][] = []
  if (input?.length > 0) {
    const middleIndex = Math.ceil(input.length / 2)
    const firstHalf = input.splice(0, middleIndex)
    const secondHalf = input.splice(-middleIndex)
    result = [firstHalf, secondHalf]
  }
  return result
}

export function parseInput(input: string): Rucksack[] {
  const inputAsArray = input?.trim() ? input.trim().split('\n') : []
  const result: Rucksack[] = []
  if (inputAsArray?.length > 0) {
    inputAsArray.forEach(contentsAsString => {
      result.push({compartments: splitInTwoHalves([...contentsAsString])})
    });
  }
  return result
}
