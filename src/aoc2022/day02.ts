export enum RockPaperScissorsOpponentType {
  ROCK = 'A',
  PAPER = 'B',
  SCISSORS = 'C',
}

export enum RockPaperScissorsResponseType {
  ROCK = 'X',
  PAPER = 'Y',
  SCISSORS = 'Z',
}

export type Strategy = {
  choiceOfOpponent: RockPaperScissorsOpponentType,
  response: RockPaperScissorsResponseType
}

export function parseStrategies(input: string): Strategy[] {
  const result: Strategy[] = []
  return result
}
