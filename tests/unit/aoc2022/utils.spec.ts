import {describe, it, expect} from 'vitest'
import {parseInput, parseInputWithoutTrim, transposeReversedLines} from '@/aoc2022/utils'

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

  describe('parseInputWithoutTrim()', () => {
    it('gets an empty input list and returns an empty array', () => {
      const input = ``
      const result = parseInputWithoutTrim(input, createTestType)
      expect(result.length).toBe(0)
      expect(result).toStrictEqual([])
    })

    it('gets a list with one line of text and returns one TestType', () => {
      const input = ` foo `
      const result = parseInputWithoutTrim(input, createTestType)
      expect(result.length).toBe(1)
      expect(result).toStrictEqual([{value: ' foo '}])
    })

    it('gets a list with two lines of text and returns two TestTypes', () => {
      const input = `foo 
 bar `
      const result = parseInputWithoutTrim(input, createTestType)
      expect(result.length).toBe(2)
      expect(result).toStrictEqual([{value: 'foo '}, {value: ' bar '}])
    })

    it('gets a list with two chunks of text separated by two linebreaks and returns two TestTypes', () => {
      const input = ` foo
 oof

bar `
      const result = parseInputWithoutTrim(input, createTestType, '\n\n')
      expect(result.length).toBe(2)
      expect(result).toStrictEqual([{value: ' foo\n oof'}, {value: 'bar '}])
    })
  })

  describe('transposeReversedLines', () => {
    it('gets an empty string as input and returns an empty string', () => {
      const input = ``
      const result = transposeReversedLines(input)
      const expected = ``
      expect(result).toBe(expected)
    })

    it('gets one line with one column as input and returns one line with the column value in that line', () => {
      const input = `[A]`
      const result = transposeReversedLines(input)
      const expected = `[A]`
      expect(result).toBe(expected)
    })

    it('gets three lines with one column as input and returns one line with three column values where the last column value is first with 2 character wide columns', () => {
      const input = `A
B
C`
      const result = transposeReversedLines(input)
      const expected = `C|B|A`
      expect(result).toBe(expected)
    })

    it('gets three lines with two columns as input and returns two lines with three column values where the last column\'s values are first using space as column marker', () => {
      const input = `[A] [X]
[B] [Y]
[C] [Z]`
      const result = transposeReversedLines(input, 4, ' ')
      const expected = `[C] [B] [A]
[Z] [Y] [X]`
      expect(result).toBe(expected)
    })

    it('gets four lines with three columns as input and returns three lines with four column values where the last column\'s values are first', () => {
      const input = 
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3`
      const result = transposeReversedLines(input)
      const expected = ` 1 |[Z]|[N]|   
 2 |[M]|[C]|[D]
 3|[P]|   |   `
      expect(result).toBe(expected)
    })
  })
})
