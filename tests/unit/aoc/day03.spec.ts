import {describe, it, expect} from 'vitest'
import {splitInTwoHalves, parseInput, Rucksack} from '@/aoc2022/day03'

describe('day03', () => {
  describe('splitInTwoHalves', () => {
    it('gets an empty array and returns an empty array', () => {
      const result = splitInTwoHalves([])
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })

    it('gets an array with of a string of equal number of characters and returns an array with two entries of equal size', () => {
      const input = [...`vJrwpWtwJgWrhcsFMMfFFhFp`]
      const expectedFirstHalf = [...`vJrwpWtwJgWr`]
      const expectedSecondHalf = [...`hcsFMMfFFhFp`]
      const result = splitInTwoHalves(input)
      expect(result.length).toBe(2)
      expect(result).toStrictEqual([expectedFirstHalf,expectedSecondHalf])
    })
  })

  describe('parseInput', () => {
    it('gets an empty list as input and returns no rucksacks', () => {
      const result: Rucksack[] = parseInput('')
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })

    it('gets a list with one entry as input and returns one rucksacks', () => {
      const input = `vJrwpWtwJgWrhcsFMMfFFhFp`
      const expectedFirstHalf = [...`vJrwpWtwJgWr`]
      const expectedSecondHalf = [...`hcsFMMfFFhFp`]
      const result: Rucksack[] = parseInput(input)
      expect(result.length).toBe(1)
      expect(result).toStrictEqual([{compartments: [expectedFirstHalf,expectedSecondHalf]}])
    })
  })
})
