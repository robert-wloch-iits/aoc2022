type Elf = {
  calories: number[]
  totalCalories: number,
}

type ElvesWithMaxTotalCalories = {
  elfNumber: number,
  elf: Elf,
}
function templateElf(): Elf {
  return {
    calories: [],
    totalCalories: 0,
  } 
}

export function convertInputToElves(input: string): Elf[] {
  const inputAsArray = input ? input.split('\n') : []
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
  return result
}
