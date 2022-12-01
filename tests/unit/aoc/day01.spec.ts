import {findElfWithMostCalories} from '@/aoc2022/day01'

describe('day01', () => {
  describe('puzzle 1', () => {
    it('has gets an empty list as input and finds no elves', () => {
      const input = ''
      expect(findElfWithMostCalories(input)).toStrictEqual([])
    })
  })
})
