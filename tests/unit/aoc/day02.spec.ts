import {describe, it, expect} from 'vitest'
import {
  parseStrategies,
  RockPaperScissorsOpponentType as OpponentRPS,
  RockPaperScissorsResponseType as ResponseRPS,
} from '@/aoc2022/day02'

describe('day02', () => {
  describe('parseStrategies', () => {
    it('gets an empty list as input and returns no strategies', () => {
      const result = parseStrategies(``)
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })

    it('gets a list with one entry as input and returns one strategy', () => {
      const result = parseStrategies(`A Y`)
      expect(result.length).toBe(1)
      expect(result).toStrictEqual([{choiceOfOpponent: OpponentRPS.A, response: ResponseRPS.Y}])
    })

    it('gets a list with three entries as input and returns three strategies', () => {
      const result = parseStrategies(`A Y
      B X
      C Z`)
      expect(result.length).toBe(3)
      expect(result).toStrictEqual([
        {choiceOfOpponent: OpponentRPS.A, response: ResponseRPS.Y},
        {choiceOfOpponent: OpponentRPS.B, response: ResponseRPS.X},
        {choiceOfOpponent: OpponentRPS.C, response: ResponseRPS.Z},
      ])
    })
  })
})
