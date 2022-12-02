export enum RockPaperScissorsOpponentType {
  A = 1,
  B = 2,
  C = 3,
}

export enum RockPaperScissorsResponseType {
  X = 1,
  Y = 2,
  Z = 3,
}

export type Strategy = {
  choiceOfOpponent: RockPaperScissorsOpponentType,
  response: RockPaperScissorsResponseType,
  score: number,
}

export enum ScoresType {
  LOOSE = 0,
  DRAW = 3,
  WIN = 6,
}

export function calculateStrategyScore(choiceOfOpponent: RockPaperScissorsOpponentType, response: RockPaperScissorsResponseType): number {
  let result: number

  const isSameChoice = +response === +choiceOfOpponent
  const isScissorsGotBeatenByRock = response === RockPaperScissorsResponseType.Z && choiceOfOpponent === RockPaperScissorsOpponentType.A
  const isRockBeatsScissors = response === RockPaperScissorsResponseType.X && choiceOfOpponent === RockPaperScissorsOpponentType.C
  const isResponseIsInferior = +response < +choiceOfOpponent && !isRockBeatsScissors

  if (isSameChoice) {
    result = +response + ScoresType.DRAW
  } else if (isScissorsGotBeatenByRock || isResponseIsInferior) {
    result = +response + ScoresType.LOOSE
  } else {
    result = +response + ScoresType.WIN
  }

  return result
}

export function parseStrategies(input: string): Strategy[] {
  const result: Strategy[] = []
  const inputLinesArray = input?.trim() ? input.trim().split('\n') : []
  
  if (inputLinesArray?.length > 0) {
    inputLinesArray.forEach(inputLine => {
      const [choiceOfOpponentString, responseString] = inputLine?.trim() ? inputLine.trim().split(' ') : []
      const choiceOfOpponent = RockPaperScissorsOpponentType[choiceOfOpponentString as keyof typeof RockPaperScissorsOpponentType]
      const response = RockPaperScissorsResponseType[responseString as keyof typeof RockPaperScissorsResponseType]

      const score = calculateStrategyScore(choiceOfOpponent, response)

      result.push({choiceOfOpponent, response, score})
    });

  }
  return result
}
