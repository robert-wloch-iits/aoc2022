export interface Rucksack {
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
      result.push({compartments: splitInTwoHalves([...contentsAsString.trim()])})
    });
  }
  return result
}

export function findDuplicateItemsInCompartments(compartments: string[][]): string[] {
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

export function sumOfPrioritiesOfDuplicateItemsInCompartments(rucksacks: Rucksack[]): number {
  let result = 0
  if (rucksacks?.length > 0) {
    rucksacks.forEach(rucksack => {
      const duplicatesInCompartment = findDuplicateItemsInCompartments(rucksack.compartments)
      if (duplicatesInCompartment?.length > 0) {
        result += duplicatesInCompartment.map(duplicate => priorityOfItem(duplicate)).reduce((sum, current) => sum + current)
      }
    })
  }
  return result
}

export interface Group {
  badge: string
}

export function groupRucksacks(rucksacks: Rucksack[]): Group[] {
  const result: Group[] = []
  if (rucksacks?.length > 0 && rucksacks.length % 3 === 0) {
    const chunkSize = 3
    for (let i = 0; i < rucksacks.length; i += chunkSize) {
      const chunk = rucksacks.slice(i, i + chunkSize)
      
      const combinedCompartments = chunk.map((rucksack) => [...rucksack.compartments[0], ...rucksack.compartments[1]])
      const duplicatesInFirstTwo = findDuplicateItemsInCompartments(combinedCompartments.slice(0, 2))
      const badge = findDuplicateItemsInCompartments([duplicatesInFirstTwo, combinedCompartments[2]])
      if (badge.length !== 1) {
        console.error('Failed to find one common badge in current chunk!', JSON.stringify(chunk))        
      } else {
        result.push({badge: badge[0]})
      }
    }
  }
  return result
}

export function sumOfPrioritiesOfAllBadges(rucksacks: Rucksack[]): number {
  let result = 0
  if (rucksacks?.length > 0 && rucksacks.length % 3 === 0) {
    const groups = groupRucksacks(rucksacks)
    result = groups.map((group) => priorityOfItem(group.badge)).reduce((sum, current) => sum + current)
  }
  return result
}
