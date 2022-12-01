import {convertInputToElves, findElfWithMostCalories} from '@/aoc2022/day01'

describe('day01', () => {
  describe('convertInputToElves', () => {
    it('gets an empty list as input and returns no elves', () => {
      const input = ''
      expect(convertInputToElves(input)).toStrictEqual([])
    })

    it('gets a list with one entry as input and returns one elve with that calories value', () => {
      const input = '1000'
      expect(convertInputToElves(input)).toStrictEqual([{calories:[1000], totalCalories: 1000}])
    })
  })

  // describe('findElfWithMostCalories', () => {
  // })
})
