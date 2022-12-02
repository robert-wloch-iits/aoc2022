import { describe, it, expect } from 'vitest'
import {parseStrategies} from '@/aoc2022/day02'

describe('day02', () => {
  describe('parseStrategies', () => {
    it('gets an empty list as input and returns no strategies', () => {
      const result = parseStrategies('')
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })
  })
})
