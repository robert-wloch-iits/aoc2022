export enum RockPaperScissorsOpponentType {
  A,
  B,
  C,
}

export enum RockPaperScissorsResponseType {
  X = 1,
  Y = 2,
  Z = 3,
}

export type Strategy = {
  choiceOfOpponent: RockPaperScissorsOpponentType,
  response: RockPaperScissorsResponseType
}

export function parseStrategies(input: string): Strategy[] {
  const result: Strategy[] = []
  const inputLinesArray = input?.trim() ? input.trim().split('\n') : []
  
  if (inputLinesArray?.length > 0) {
    inputLinesArray.forEach(inputLine => {
      const [choiceOfOpponentString, responseString] = inputLine?.trim() ? inputLine.trim().split(' ') : []
      const choiceOfOpponent = RockPaperScissorsOpponentType[choiceOfOpponentString as keyof typeof RockPaperScissorsOpponentType]
      const response = RockPaperScissorsResponseType[responseString as keyof typeof RockPaperScissorsResponseType]

      result.push({choiceOfOpponent, response})
    });

  }
  return result
}
