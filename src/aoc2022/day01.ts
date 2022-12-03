import {parseInput} from '@/aoc2022/utils'

type ElfChunkType = {
  caloriesOfElf: number[]
}
function createElfChunkType(chunk: string): ElfChunkType {
  return {
    caloriesOfElf: parseInput<number>(chunk, (element: string) => +element)
  }
}

export type Elf = {
  calories: number[]
  totalCalories: number
}
function createElf(chunk: string): Elf {
  const elfChunk = createElfChunkType(chunk)
  return {
    calories: elfChunk.caloriesOfElf,
    totalCalories: elfChunk.caloriesOfElf.reduce((sum, current) => sum + current),
  }
}

export function convertInputToElves(input: string): Elf[] {
  const result: Elf[] = parseInput<Elf>(input, createElf, '\n\n')
  return result
}

export type ElvesWithMaxTotalCalories = {
  elfNumber: number
  elf: Elf
}

export function findElvesWithMaxCalories(
  elves: Elf[]
): ElvesWithMaxTotalCalories[] {
  const result: ElvesWithMaxTotalCalories[] = []
  if (elves.length) {
    const maxTotalCalories = Math.max(...elves.map((e) => e.totalCalories))
    for (let index = 0; index < elves.length; index++) {
      const elf = elves[index]
      if (maxTotalCalories === elves[index].totalCalories) {
        result.push({elfNumber: index + 1, elf})
      }
    }
  }
  return result
}

export function findTopThreeElvesWithMostCalories(
  elves: Elf[]
): ElvesWithMaxTotalCalories[] {
  const result: ElvesWithMaxTotalCalories[] = []
  if (elves.length) {
    const sortedElves = [...elves].sort(
      (a, b) => b.totalCalories - a.totalCalories
    )
    const topThreeElves = sortedElves.slice(0, 3)
    topThreeElves.forEach((elf) => {
      const elfNumber =
        elves.findIndex((e) => e.totalCalories === elf.totalCalories) + 1
      result.push({elfNumber, elf})
    })
  }
  return result
}
