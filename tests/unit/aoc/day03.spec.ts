import {describe, it, expect} from 'vitest'
import {splitInTwoHalves, priorityOfItem, parseInput, findDuplicateItemsInCompartments, Rucksack} from '@/aoc2022/day03'

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

  describe('priorityOfItem', () => {
    const testData = [
      {input: '', expected: 0},
      {input: 'a', expected: 1},
      {input: 'p', expected: 16},
      {input: 'z', expected: 26},
      {input: 'A', expected: 27},
      {input: 'P', expected: 42},
      {input: 'Z', expected: 52},
    ]
    it.each(testData)('gets string %input and returns %expected', ({input, expected}) => {
      expect(priorityOfItem(input)).toBe(expected)
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

  describe('findDuplicateItemsInCompartments', () => {
    it('gets an empty list of compartments as input and returns no duplicates', () => {
      const input: string[] = []
      const result: string[] = findDuplicateItemsInCompartments(input)
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })

    it('gets a list of one compartment with no duplicates as input and returns no duplicates', () => {
      const input: string[] = [`vJr`, `wpW`]
      const result: string[] = findDuplicateItemsInCompartments(input)
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })

    it('gets a list of one compartment with one duplicate as input and returns one duplicate', () => {
      const input: string[] = [`vJrwpWtwJgWr`, `hcsFMMfFFhFp`]
      const result: string[] = findDuplicateItemsInCompartments(input)
      expect(result.length).toBe(1)
      expect(result).toStrictEqual(['p'])
    })

    it('gets a list of one compartment with two duplicates as input and returns two duplicates', () => {
      const input: string[] = [`vJrwpWtwJgWr`, `hcsFMrfFFhFp`]
      const result: string[] = findDuplicateItemsInCompartments(input)
      expect(result.length).toBe(2)
      expect(result).toStrictEqual(['r', 'p'])
    })
  })

})
