export type Elf = {
  calories: number[]
  totalCalories: number,
}

export type ElvesWithMaxTotalCalories = {
  elfNumber: number,
  elf: Elf,
}

export function convertInputToElves(input: string): Elf[] {
  const inputAsArray = input?.trim() ? input.trim().split('\n') : []
  const result: Elf[] = []

  if (inputAsArray.length) {
    let calories: number[] = []
    inputAsArray.forEach(inputLine => {
      if (+inputLine) {
        calories.push(+inputLine)
      } else {
        result.push({calories, totalCalories: calories.reduce((sum, current) => sum + current)})
        calories = []
      }
    });
    if (calories.length > 0) {
      result.push({calories, totalCalories: calories.reduce((sum, current) => sum + current)})
      calories = []
    }
  }

  return result
}

export function findElfWithMostCalories(elves: Elf[]): ElvesWithMaxTotalCalories[] {
  const result: ElvesWithMaxTotalCalories[] = []
  if (elves.length) {
    const maxTotalCalories = Math.max(...elves.map(e => e.totalCalories))
    for (let index = 0; index < elves.length; index++) {
      const elf = elves[index];
      if (maxTotalCalories === elves[index].totalCalories) {
        result.push({elfNumber: index + 1, elf})
      }
    }
  }
  return result
}

export function findTopThreeElvesWithMostCalories(elves: Elf[]): ElvesWithMaxTotalCalories[] {
  const result: ElvesWithMaxTotalCalories[] = []
  if (elves.length) {
    const sortedElves = [...elves].sort((a, b) => b.totalCalories - a.totalCalories)
    const topThreeElves = sortedElves.slice(0, 3)
    topThreeElves.forEach(elf => {
      const elfNumber = elves.findIndex(e => e.totalCalories === elf.totalCalories) + 1
      result.push({elfNumber, elf})
    });
  }
  return result
}
