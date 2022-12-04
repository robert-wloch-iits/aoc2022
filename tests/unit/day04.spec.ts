import {describe, it, expect} from 'vitest'

import {createAssignmentType, AssignmentType} from '@/aoc2022/day04'

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
})
