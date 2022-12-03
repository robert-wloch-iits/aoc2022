import {describe, it, expect} from 'vitest'
import {parseInput} from '@/aoc2022/day03'

describe('day03', () => {
  describe('parseInput', () => {
    it('gets an empty list as input and returns no rucksacks', () => {
      const result = parseInput('')
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })
  })
})
