import {parseInput} from '@/aoc2022/utils'

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

export enum RockPaperScissorsResponseStrategyType {
  X = 0,
  Y = 3,
  Z = 6,
}

export interface StrategyType {
  choiceOfOpponent: RockPaperScissorsOpponentType,
  response: RockPaperScissorsResponseType,
  score: number,
}

export interface ResponseStrategyType extends StrategyType {
  responseStrategy: RockPaperScissorsResponseStrategyType,
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

function createStrategyType(chunk: string): StrategyType {
  const [choiceOfOpponentString, responseString] = chunk ? chunk.split(' ') : []
  const choiceOfOpponent = RockPaperScissorsOpponentType[choiceOfOpponentString as keyof typeof RockPaperScissorsOpponentType]
  const response = RockPaperScissorsResponseType[responseString as keyof typeof RockPaperScissorsResponseType]
  const score = calculateStrategyScore(choiceOfOpponent, response)

  return {choiceOfOpponent, response, score}
}

export function parseStrategies(input: string): StrategyType[] {
  const strategies = parseInput<StrategyType>(input, createStrategyType)
  return strategies
}

export function findStrategicResponseOnChoiceOfOpponent(choiceOfOpponent: RockPaperScissorsOpponentType,  responseStrategy: RockPaperScissorsResponseStrategyType): RockPaperScissorsResponseType {
  const strategyMap = {
    0: {
      1: RockPaperScissorsResponseType.Z,
      2: RockPaperScissorsResponseType.X,
      3: RockPaperScissorsResponseType.Y,
    },
    3: {
      1: RockPaperScissorsResponseType.X,
      2: RockPaperScissorsResponseType.Y,
      3: RockPaperScissorsResponseType.Z,
    },
    6: {
      1: RockPaperScissorsResponseType.Y,
      2: RockPaperScissorsResponseType.Z,
      3: RockPaperScissorsResponseType.X,
    },
  }
  return strategyMap[responseStrategy][choiceOfOpponent]
}

function createResponseStrategyType(chunk: string): ResponseStrategyType {
  const [choiceOfOpponentString, responseStrategyString] = chunk ? chunk.split(' ') : []
  const choiceOfOpponent = RockPaperScissorsOpponentType[choiceOfOpponentString as keyof typeof RockPaperScissorsOpponentType]
  const responseStrategy = RockPaperScissorsResponseStrategyType[responseStrategyString as keyof typeof RockPaperScissorsResponseStrategyType]

  const response = findStrategicResponseOnChoiceOfOpponent(choiceOfOpponent, responseStrategy)
  const score = calculateStrategyScore(choiceOfOpponent, response)

  return {choiceOfOpponent, responseStrategy, response, score}
}

export function parseResponseStrategies(input: string): ResponseStrategyType[] {
  const result = parseInput<ResponseStrategyType>(input, createResponseStrategyType)
  return result
}

export function totalScoreOfStrategies(strategies: StrategyType[] | ResponseStrategyType[]): number {
  return strategies?.length > 0 ? strategies.map((strategy) => strategy.score).reduce((sum, current) => sum + current) : 0
}
