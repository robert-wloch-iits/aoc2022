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

function range(start: number, end: number): Array<number> {
  return Array<number>(end - start + 1).fill(0).map((_, idx) => start + idx)
}

export function priorityOfItem(input: string): number {
  let result = 0
  if (input?.length === 1) {
    const lowPriorityItems = [...String.fromCharCode(...range(97, 122))]
    const highPriorityItems = [...String.fromCharCode(...range(65, 90))]

    if (lowPriorityItems.includes(input)) {
      result = input.charCodeAt(0) - 96
    } else if (highPriorityItems.includes(input)) {
      result = input.charCodeAt(0) - (65 - 27)
    }
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

export function findDuplicateItemsInCompartments(compartments: string[]): string[] {
  const result: string[] = []
  if (compartments?.length === 2) {
    const firstHalf = [...compartments[0]]
    const secondHalf = [...compartments[1]]
    firstHalf.forEach(element => {
      if (!result.includes(element) && secondHalf.includes(element)) {
        result.push(element)
      }
    });
  }

  return result
}