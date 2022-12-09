import {describe, it, expect} from 'vitest'
import {
  parseInput,
  parseInputWithoutTrim,
  transposeReversedLines,
  uniqueStringMatcher,
  findStartOfSequence,
  subset,
  initializeMatrix,
  appendColumn,
  prependColumn,
  appendRow,
  prependRow,
  distanceInArray,
  matrixReduce,
  findCoordinate2D,
  setMatrixValue,
} from '@/aoc2022/utils'

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

  describe('uniqueStringMatcher', () => {
    const testData = [
      {nextSymbol: '', matchBuffer: [], expectedMatchBuffer: ['']},
      {nextSymbol: 'a', matchBuffer: [], expectedMatchBuffer: ['a']},
      {nextSymbol: 'a', matchBuffer: ['b'], expectedMatchBuffer: ['b', 'a']},
      {nextSymbol: 'a', matchBuffer: ['b', 'a'], expectedMatchBuffer: ['a']},
      {nextSymbol: 'a', matchBuffer: ['a'], expectedMatchBuffer: ['a']},
      {nextSymbol: 'a', matchBuffer: ['b', 'c'], expectedMatchBuffer: ['b', 'c', 'a']},
    ]
    it.each(testData)('gets ($nextSymbol, $matchBuffer) as input and returns $expectedMatchBuffer', ({nextSymbol, matchBuffer, expectedMatchBuffer}) => {
      uniqueStringMatcher(nextSymbol, matchBuffer)
      expect(matchBuffer).toStrictEqual(expectedMatchBuffer)
    })
  })

  describe('findStartOfSequence', () => {
    describe('for symbol type string', () => {
      const testDataStartOfSequence = [
        {input: [...''], matchBufferLength: 4, offsetToMatchIndex: 4, expected: -1},
        {input: [...'bvw'], matchBufferLength: 4, offsetToMatchIndex: 4, expected: -1},
        {input: [...'bvwb'], matchBufferLength: 4, offsetToMatchIndex: 4, expected: -1},
        {input: [...'bvwbjplbgvbhsrlpgdmjqwftvncz'], matchBufferLength: 4, offsetToMatchIndex: 4, expected: 5},
        {input: [...'nppdvjthqldpwncqszvftbrmjlhg'], matchBufferLength: 4, offsetToMatchIndex: 4, expected: 6},
        {input: [...'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'], matchBufferLength: 4, offsetToMatchIndex: 4, expected: 10},
        {input: [...'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'], matchBufferLength: 4, offsetToMatchIndex: 4, expected: 11},
        {input: [...'mjqjpqmgbljsphdztnvjfqwrcgsmlb'], matchBufferLength: 14, offsetToMatchIndex: 14, expected: 19},
        {input: [...'bvwbjplbgvbhsrlpgdmjqwftvncz'], matchBufferLength: 14, offsetToMatchIndex: 14, expected: 23},
        {input: [...'nppdvjthqldpwncqszvftbrmjlhg'], matchBufferLength: 14, offsetToMatchIndex: 14, expected: 23},
        {input: [...'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'], matchBufferLength: 14, offsetToMatchIndex: 14, expected: 29},
        {input: [...'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'], matchBufferLength: 14, offsetToMatchIndex: 14, expected: 26},
        {input: [...'bvwbjplbgvbhsrlpgdmjqwftvncz'], matchBufferLength: 4, offsetToMatchIndex: undefined, expected: 5},
        {input: [...'bvwbjplbgvbhsrlpgdmjqwftvncz'], matchBufferLength: 4, offsetToMatchIndex: 0, expected: 1},
        {input: [...'mjqjpqmgbljsphdztnvjfqwrcgsmlb'], matchBufferLength: 14, offsetToMatchIndex: undefined, expected: 19},
        {input: [...'mjqjpqmgbljsphdztnvjfqwrcgsmlb'], matchBufferLength: 14, offsetToMatchIndex: 0, expected: 5},
      ]
      it.each(testDataStartOfSequence)('gets "$input" as input and returns $expected as start index of sequence', ({input, matchBufferLength, offsetToMatchIndex, expected}) => {
        expect(findStartOfSequence<string>(input, uniqueStringMatcher, matchBufferLength, offsetToMatchIndex)).toBe(expected)
      })
    })
  })

  describe('subset', () => {
    it('gets an empty matrix and returns an empty matrix', () => {
      const heightMap: number[][] = subset([], 1, 3, 1, 3)
      const expected: number[][] = []
      expect(heightMap).toStrictEqual(expected)
    })

    it('gets one row as matrix and returns an empty matrix', () => {
      const heightMap: number[][] = subset([[3, 0, 3, 7, 3]], 1, 3, 1, 3)
      const expected: number[][] = []
      expect(heightMap).toStrictEqual(expected)
    })

    it('gets two rows as matrix and returns an empty matrix', () => {
      const heightMap: number[][] = subset([
        [3, 0, 3, 7, 3],
        [2, 5, 5, 1, 2],
      ],
      1, 3, 1, 3)
      const expected: number[][] = []
      expect(heightMap).toStrictEqual(expected)
    })

    it('gets three rows with one column as matrix and returns an empty matrix', () => {
      const heightMap: number[][] = subset([[3],[2],[6]], 1, 3, 1, 3)
      const expected: number[][] = []
      expect(heightMap).toStrictEqual(expected)
    })

    it('gets three rows with two columns as matrix and returns an empty matrix', () => {
      const heightMap: number[][] = subset([
        [3, 0],
        [2, 5],
        [6, 5],
      ],
      1, 3, 1, 3)
      const expected: number[][] = []
      expect(heightMap).toStrictEqual(expected)
    })

    it('gets five rows with 5 columns as matrix and returns a matrix with three rows and three columns', () => {
      const heightMap: number[][] = subset([
        [3, 0, 3, 7, 3],
        [2, 5, 5, 1, 2],
        [6, 5, 3, 3, 2],
        [3, 3, 5, 4, 9],
        [3, 5, 3, 9, 0],
      ],
      1, 3, 1, 3)
      const expected: number[][] = [
        [5, 5, 1],
        [5, 3, 3],
        [3, 5, 4],
      ]
      expect(heightMap).toStrictEqual(expected)
    })
  })

  describe('initializeMatrix', () => {
    it('gets an empty matrix and returns an empty matrix', () => {
      const initializedMatrix: number[][] = initializeMatrix<number>([], 0)
      const expected: number[][] = []
      expect(initializedMatrix).toStrictEqual(expected)
    })

    it('gets a matrix with one row and returns a matrix with one row', () => {
      const initializedMatrix: number[][] = initializeMatrix<number>([[3, 0, 3, 7, 3]], 0)
      const expected: number[][] = [[0, 0, 0, 0, 0]]
      expect(initializedMatrix).toStrictEqual(expected)
    })

    it('gets a matrix with two rows and returns a matrix with two rows', () => {
      const initializedMatrix: number[][] = initializeMatrix<number>([
        [3, 0, 3, 7, 3],
        [2, 5, 5, 1, 2],
      ], 0)
      const expected: number[][] = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
      expect(initializedMatrix).toStrictEqual(expected)
    })

    it('gets a matrix with three rows and one column and returns a matrix with three rows with one column', () => {
      const initializedMatrix: number[][] = initializeMatrix<number>([[3],[2],[6]], 0)
      const expected: number[][] = [[0],[0],[0]]
      expect(initializedMatrix).toStrictEqual(expected)
    })

    it('gets a matrix with three rows and two columns and returns a matrix with three rows and two columns', () => {
      const initializedMatrix: number[][] = initializeMatrix<number>([
        [3, 0],
        [2, 5],
        [6, 5],
      ], 0)
      const expected: number[][] = [
        [0, 0],
        [0, 0],
        [0, 0],
      ]
      expect(initializedMatrix).toStrictEqual(expected)
    })

    it('gets a matrix with five rows and five columns and returns a matrix with five rows and five columns', () => {
      const initializedMatrix: number[][] = initializeMatrix<number>([
        [3, 0, 3, 7, 3],
        [2, 5, 5, 1, 2],
        [6, 5, 3, 3, 2],
        [3, 3, 5, 4, 9],
        [3, 5, 3, 9, 0],
      ], 0)
      const expected: number[][] = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
      expect(initializedMatrix).toStrictEqual(expected)
    })
  })

  describe('appendColumn', () => {
    it('gets an empty matrix and returns a matrix with a new column', () => {
      const matrix: number[][] = []
      appendColumn<number>(matrix, 1)
      const expected: number[][] = [[1]]
      expect(matrix).toStrictEqual(expected)
    })

    it('gets a matrix with one row and returns a matrix with one row and a new column', () => {
      const matrix: number[][] = [[0]]
      appendColumn<number>(matrix, 1)
      const expected: number[][] = [[0, 1]]
      expect(matrix).toStrictEqual(expected)
    })

    it('gets a matrix with two rows and returns a matrix with two rows and a new column', () => {
      const matrix: number[][] = [[0], [0]]
      appendColumn<number>(matrix, 1)
      const expected: number[][] = [[0, 1], [0, 1]]
      expect(matrix).toStrictEqual(expected)
    })
  })

  describe('prependColumn', () => {
    it('gets an empty matrix and returns a matrix with a new column', () => {
      const matrix: number[][] = []
      prependColumn<number>(matrix, 1)
      const expected: number[][] = [[1]]
      expect(matrix).toStrictEqual(expected)
    })

    it('gets a matrix with one row and returns a matrix with one row and a new column', () => {
      const matrix: number[][] = [[0]]
      prependColumn<number>(matrix, 1)
      const expected: number[][] = [[1, 0]]
      expect(matrix).toStrictEqual(expected)
    })

    it('gets a matrix with two rows and returns a matrix with two rows and a new column', () => {
      const matrix: number[][] = [[0], [0]]
      prependColumn<number>(matrix, 1)
      const expected: number[][] = [[1, 0], [1, 0]]
      expect(matrix).toStrictEqual(expected)
    })
  })

  describe('appendRow', () => {
    it('gets an empty matrix and returns a matrix with a new row', () => {
      const matrix: number[][] = []
      appendRow<number>(matrix, 1)
      const expected: number[][] = [[1]]
      expect(matrix).toStrictEqual(expected)
    })

    it('gets a matrix with one row and returns a matrix with two rows', () => {
      const matrix: number[][] = [[0]]
      appendRow<number>(matrix, 1)
      const expected: number[][] = [[0],[1]]
      expect(matrix).toStrictEqual(expected)
    })

    it('gets a matrix with two rows and returns a matrix with three rows', () => {
      const matrix: number[][] = [[0, 0], [0, 0]]
      appendRow<number>(matrix, 1)
      const expected: number[][] = [[0, 0], [0, 0], [1, 1]]
      expect(matrix).toStrictEqual(expected)
    })
  })

  describe('prependRow', () => {
    it('gets an empty matrix and returns a matrix with a new row', () => {
      const matrix: number[][] = []
      prependRow<number>(matrix, 1)
      const expected: number[][] = [[1]]
      expect(matrix).toStrictEqual(expected)
    })

    it('gets a matrix with one row and returns a matrix with two rows', () => {
      const matrix: number[][] = [[0]]
      prependRow<number>(matrix, 1)
      const expected: number[][] = [[1], [0]]
      expect(matrix).toStrictEqual(expected)
    })

    it('gets a matrix with two rows and returns a matrix with three rows', () => {
      const matrix: number[][] = [[0, 0], [0, 0]]
      prependRow<number>(matrix, 1)
      const expected: number[][] = [[1, 1], [0, 0], [0, 0]]
      expect(matrix).toStrictEqual(expected)
    })
  })

  describe('distanceInArray', () => {
    const candidate = 5
    const criteriaFn = (value: number) => value >= candidate

    it('gets an empty array as input and returns 0', () => {
      const input: number[] = []
      expect(distanceInArray<number>(input, criteriaFn)).toBe(0)
    })

    it('gets an array[3] without 5 as input and returns 3', () => {
      const input: number[] = [1, 2, 3]
      expect(distanceInArray<number>(input, criteriaFn)).toBe(3)
    })

    it('gets an array[3] with 5 at first index as input and returns 1', () => {
      const input: number[] = [5, 2, 3]
      expect(distanceInArray<number>(input, criteriaFn)).toBe(1)
    })

    it('gets an array[3] with 5 at second index as input and returns 2', () => {
      const input: number[] = [1, 5, 3]
      expect(distanceInArray<number>(input, criteriaFn)).toBe(2)
    })
  })

  describe('matrixReduce', () => {
    const reducerFn = (acc: number, value: number) => Math.max(acc, value)

    it('gets an empty matrix as input and returns 0', () => {
      const input: number[][] = []
      expect(matrixReduce<number>(input, reducerFn, 0)).toBe(0)
    })

    it('gets a matrix[1][3] as input and returns 3', () => {
      const input: number[][] = [
        [0, 3, 0],
      ]
      expect(matrixReduce<number>(input, reducerFn, 0)).toBe(3)
    })

    it('gets a matrix[2[5] as input and returns 4', () => {
      const input: number[][] = [
        [0, 0, 0, 0, 0],
        [0, 1, 4, 1, 0],
      ]
      expect(matrixReduce<number>(input, reducerFn, 0)).toBe(4)
    })

    it('gets a matrix[5][5] as input and returns 8', () => {
      const input: number[][] = [
        [0, 0, 0, 0, 0],
        [0, 1, 4, 1, 0],
        [0, 6, 1, 2, 0],
        [0, 1, 8, 3, 0],
        [0, 0, 0, 0, 0],
      ]
      expect(matrixReduce<number>(input, reducerFn, 0)).toBe(8)
    })
  })

  describe('findCoordinate2D', () => {
    it('gets a matrix without values and returns no coordinates', () => {
      const input: string[][] = []
      expect(findCoordinate2D(input, 'H')).toStrictEqual({row: -1, column: -1})
    })
  
    it('gets a matrix with values excluding the searched one and returns no coordinates', () => {
      const input: string[][] = [['A', 'B'], ['C', 'D']]
      expect(findCoordinate2D(input, 'H')).toStrictEqual({row: -1, column: -1})
    })
  
    it('gets a matrix with values excluding the searched one but with the fallback value and returns no coordinates', () => {
      const input: string[][] = [['A', 'B'], ['C', 'D']]
      expect(findCoordinate2D(input, 'H', ['B'])).toStrictEqual({row: 0, column: 1})
    })
  
    it('gets a matrix with values excluding the searched one but with the second fallback value and returns no coordinates', () => {
      const input: string[][] = [['A', 'B'], ['C', 'D']]
      expect(findCoordinate2D(input, 'H', ['I', 'B'])).toStrictEqual({row: 0, column: 1})
    })
  
    it('gets a matrix with values including the searched one and returns the coordinates', () => {
      const input: string[][] = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']]
      expect(findCoordinate2D(input, 'H')).toStrictEqual({row: 2, column: 1})
    })
  })

  describe('setMatrixValue', () => {
    it('gets an empty matrix and an invalid coordinate and leaves the matrix unchanged', () => {
      const matrix: number[][] = []
      setMatrixValue<number>(matrix, {row: -1, column: -1}, 1)
      const expected: number[][] = []
      expect(matrix).toStrictEqual(expected)
    })

    it('gets a matrix and an invalid coordinate and leaves the matrix unchanged', () => {
      const matrix: number[][] = [[0, 0], [0, 0]]
      setMatrixValue<number>(matrix, {row: -1, column: -1}, 1)
      const expected: number[][] = matrix
      expect(matrix).toStrictEqual(expected)
    })

    it('gets a matrix and a valid coordinate and modifies the matrix at the coordinate', () => {
      const matrix: number[][] = [[0, 0], [0, 0]]
      setMatrixValue<number>(matrix, {row: 0, column: 1}, 1)
      const expected: number[][] = [[0, 1], [0, 0]]
      expect(matrix).toStrictEqual(expected)
    })
  })
})
