import {describe, it, expect} from 'vitest'
import {parseInput} from '@/aoc2022/utils'

type TestType = {
  value: string
}
function createTestType(chunk: string): TestType {
  return {value: chunk}
}

describe('utils.ts', () => {
  describe('parseInput()', () => {
    it('gets an empty input list and returns an empty array', () => {
      const input = ``
      const result = parseInput(input, createTestType)
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })

    it('gets a list with one line of text and returns one TestType', () => {
      const input = `foo`
      const result = parseInput(input, createTestType)
      expect(result.length).toBe(1)
      expect(result).toStrictEqual([{value: 'foo'}])
    })

    it('gets a list with two lines of text and returns two TestTypes', () => {
      const input = `foo
      bar`
      const result = parseInput(input, createTestType)
      expect(result.length).toBe(2)
      expect(result).toStrictEqual([{value: 'foo'}, {value: 'bar'}])
    })

    it('gets a list with two chunks of text separated by two linebreaks and returns two TestTypes', () => {
      const input = `foo
oof

bar`
      const result = parseInput(input, createTestType, '\n\n')
      expect(result.length).toBe(2)
      expect(result).toStrictEqual([{value: 'foo\noof'}, {value: 'bar'}])
    })
  })
})
