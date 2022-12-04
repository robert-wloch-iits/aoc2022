import {describe, it, expect} from 'vitest'

import {
  createAssignmentType,
  AssignmentType,
  createAssignmentPairType,
  AssignmentPairType,
  isContainingOtherAssignmentFully,
  parseAssignmentPairs,
} from '@/aoc2022/day04'

describe('day04', () => {
  describe('createAssignmentType', () => {
    it('gets an empty assignment chunk and returns an empty assignment', () => {
      const result: AssignmentType = createAssignmentType('')
      expect(result).toStrictEqual({startSection: undefined, endSection: undefined})
    })

    it('gets an assignment chunk with single digits and returns the assignment with single digit ranges', () => {
      const result: AssignmentType = createAssignmentType('2-4')
      expect(result).toStrictEqual({startSection: 2, endSection: 4})
    })

    it('gets an assignment chunk with multiple digits and returns the assignment with multiple digit ranges', () => {
      const result: AssignmentType = createAssignmentType('22-444')
      expect(result).toStrictEqual({startSection: 22, endSection: 444})
    })
  })

  describe('createAssignmentPairType', () => {
    it('gets an empty assignment pair chunk and returns an empty assignment pair', () => {
      const result: AssignmentPairType = createAssignmentPairType('')
      const expected: AssignmentPairType = {
        first: undefined,
        second: undefined
      }
      expect(result).toStrictEqual(expected)
    })

    it('gets an partial assignment pair chunk with single digits and returns a partial assignment pair with single digit ranges', () => {
      const result: AssignmentPairType = createAssignmentPairType('2-4,')
      const expected: AssignmentPairType = {
        first: {startSection: 2, endSection: 4},
        second: {startSection: undefined, endSection: undefined}
      }
      expect(result).toStrictEqual(expected)
    })

    it('gets an assignment pair chunk with single digits and returns the assignment pair with single digit ranges', () => {
      const result: AssignmentPairType = createAssignmentPairType('2-4,4-9')
      const expected: AssignmentPairType = {
        first: {startSection: 2, endSection: 4},
        second: {startSection: 4, endSection: 9}
      }
      expect(result).toStrictEqual(expected)
    })

    it('gets an assignment pair chunk with multiple digits and returns the assignment pair with multiple digit ranges', () => {
      const result: AssignmentPairType = createAssignmentPairType('22-44,44-999')
      const expected: AssignmentPairType = {
        first: {startSection: 22, endSection: 44},
        second: {startSection: 44, endSection: 999}
      }
      expect(result).toStrictEqual(expected)
    })
  })

  describe('isContainingOtherAssignmentFully', () => {
    it('gets an empty assignment pair and returns false', () => {
      const input: AssignmentPairType = {
        first: undefined,
        second: undefined
      }
      expect(isContainingOtherAssignmentFully(input)).toBeFalsy()
    })

    it('gets a partial assignment pair and returns false', () => {
      const input: AssignmentPairType = {
        first: {startSection: 2, endSection: 4},
        second: {startSection: undefined, endSection: undefined}
      }
      expect(isContainingOtherAssignmentFully(input)).toBeFalsy()
    })

    it('gets an overlapping assignment pair and returns false', () => {
      const input: AssignmentPairType = {
        first: {startSection: 2, endSection: 4},
        second: {startSection: 4, endSection: 8}
      }
      expect(isContainingOtherAssignmentFully(input)).toBeFalsy()
    })

    const testDataFirstFullyContainedInSecond = [
      {startSection: 4, endSection: 4},
      {startSection: 4, endSection: 6},
      {startSection: 4, endSection: 8},
      {startSection: 8, endSection: 8},
      {startSection: 7, endSection: 8},
      {startSection: 5, endSection: 7},
      {startSection: 7, endSection: 7},
    ]
    it.each(testDataFirstFullyContainedInSecond)('gets an assignment pair where the first ($startSection-$endSection) is fully contained in the second and returns true', ({startSection, endSection}) => {
      const input: AssignmentPairType = {
        first: {startSection, endSection},
        second: {startSection: 4, endSection: 8}
      }
      expect(isContainingOtherAssignmentFully(input)).toBeTruthy()
    })

    const testDataSecondFullyContainedInFirst = [
      {startSection: 4, endSection: 4},
      {startSection: 4, endSection: 6},
      {startSection: 4, endSection: 8},
      {startSection: 8, endSection: 8},
      {startSection: 7, endSection: 8},
      {startSection: 5, endSection: 7},
      {startSection: 7, endSection: 7},
    ]
    it.each(testDataSecondFullyContainedInFirst)('gets an assignment pair where the second ($startSection-$endSection) is fully contained in the first and returns true', ({startSection, endSection}) => {
      const input: AssignmentPairType = {
        first: {startSection: 4, endSection: 8},
        second: {startSection, endSection}
      }
      expect(isContainingOtherAssignmentFully(input)).toBeTruthy()
    })
  })

  describe('parseAssignmentPairs', () => {
    it('gets an empty list and returns no assignment pairs', () => {
      const input = ``
      const result: AssignmentPairType[] = parseAssignmentPairs(input)
      const expected: AssignmentPairType[] = []
      expect(result).toStrictEqual(expected)
    })

    it('gets a list with an assignment pair and returns one assignment pair', () => {
      const input = `2-4,6-8`
      const result: AssignmentPairType[] = parseAssignmentPairs(input)
      const expected: AssignmentPairType[] = [
        {
          first: {startSection: 2, endSection: 4},
          second: {startSection: 6, endSection: 8}
        },
      ]
      expect(result).toStrictEqual(expected)
    })

    it('gets a list with six assignment pairs and returns six assignment pairs', () => {
      const input = `2-4,6-8
      2-3,4-5
      5-7,7-9
      2-8,3-7
      6-6,4-6
      2-6,4-8`
      const result: AssignmentPairType[] = parseAssignmentPairs(input)
      const expected: AssignmentPairType[] = [
        {
          first: {startSection: 2, endSection: 4},
          second: {startSection: 6, endSection: 8}
        },
        {
          first: {startSection: 2, endSection: 3},
          second: {startSection: 4, endSection: 5}
        },
        {
          first: {startSection: 5, endSection: 7},
          second: {startSection: 7, endSection: 9}
        },
        {
          first: {startSection: 2, endSection: 8},
          second: {startSection: 3, endSection: 7}
        },
        {
          first: {startSection: 6, endSection: 6},
          second: {startSection: 4, endSection: 6}
        },
        {
          first: {startSection: 2, endSection: 6},
          second: {startSection: 4, endSection: 8}
        },
      ]
      expect(result).toStrictEqual(expected)
    })
  })
})
