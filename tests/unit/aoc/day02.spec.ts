import {describe, it, expect} from 'vitest'
import {
  parseStrategies,
  calculateStrategyScore,
  RockPaperScissorsOpponentType as OpponentRPS,
  RockPaperScissorsResponseType as ResponseRPS,
  ScoresType as Score,
} from '@/aoc2022/day02'

describe('day02', () => {

  describe('calculateStrategyScore', () => {
    const testData = [
      {choiceOfOpponent: OpponentRPS.A, response: ResponseRPS.X, expectedScore: 4},
      {choiceOfOpponent: OpponentRPS.A, response: ResponseRPS.Y, expectedScore: 8},
      {choiceOfOpponent: OpponentRPS.A, response: ResponseRPS.Z, expectedScore: 3},
      {choiceOfOpponent: OpponentRPS.B, response: ResponseRPS.X, expectedScore: 1},
      {choiceOfOpponent: OpponentRPS.B, response: ResponseRPS.Y, expectedScore: 5},
      {choiceOfOpponent: OpponentRPS.B, response: ResponseRPS.Z, expectedScore: 9},
      {choiceOfOpponent: OpponentRPS.C, response: ResponseRPS.X, expectedScore: 7},
      {choiceOfOpponent: OpponentRPS.C, response: ResponseRPS.Y, expectedScore: 2},
      {choiceOfOpponent: OpponentRPS.C, response: ResponseRPS.Z, expectedScore: 6},
    ]

    it.each(testData)('gets $choiceOfOpponent, $response as input and returns $expectedScore', ({choiceOfOpponent, response, expectedScore}) => {
      const result = calculateStrategyScore(choiceOfOpponent, response)
      expect(result).toBe(expectedScore)
    })
  })

  describe('parseStrategies', () => {
    it('gets an empty list as input and returns no strategies', () => {
      const result = parseStrategies(``)
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })

    it('gets a list with one entry as input and returns one strategy', () => {
      const result = parseStrategies(`A Y`)
      expect(result.length).toBe(1)
      expect(result).toStrictEqual([{choiceOfOpponent: OpponentRPS.A, response: ResponseRPS.Y, score: calculateStrategyScore(OpponentRPS.A, ResponseRPS.Y)}])
    })

    it('gets a list with three entries as input and returns three strategies', () => {
      const result = parseStrategies(`A Y
      B X
      C Z`)
      expect(result.length).toBe(3)
      expect(result).toStrictEqual([
        {choiceOfOpponent: OpponentRPS.A, response: ResponseRPS.Y, score: calculateStrategyScore(OpponentRPS.A, ResponseRPS.Y)},
        {choiceOfOpponent: OpponentRPS.B, response: ResponseRPS.X, score: calculateStrategyScore(OpponentRPS.B, ResponseRPS.X)},
        {choiceOfOpponent: OpponentRPS.C, response: ResponseRPS.Z, score: calculateStrategyScore(OpponentRPS.C, ResponseRPS.Z)},
      ])
    })
  })
})
