export function parseInput<C, O = Record<string, unknown>>(input: string, typeFactoryFn: (chunk: string, options?: O) => C, delimiter = '\n', options?: O): C[] {
  const inputChunksArray = input?.trim() ? input.trim().split(delimiter) : []
  const result: C[] = []
  if (inputChunksArray?.length > 0) {
    inputChunksArray.forEach(chunkAsString => {
      result.push(typeFactoryFn(chunkAsString.trim(), options))
    });
  }
  return result
}

export function parseInputWithoutTrim<C>(input: string, typeFactoryFn: (chunk: string) => C, delimiter = '\n'): C[] {
  const inputChunksArray = input ? input.split(delimiter) : []
  const result: C[] = []
  if (inputChunksArray?.length > 0) {
    inputChunksArray.forEach(chunkAsString => {
      result.push(typeFactoryFn(chunkAsString))
    });
  }
  return result
}

export function transposeReversedLines(input: string, columnWidth = 4, columnMarker = '|'): string {
  let result = input
  const reversedLines = parseInputWithoutTrim<string>(input, (chunk) => chunk).reverse()
  if (reversedLines?.length > 0) {
    const reversedLinesWithColumnMarker = reversedLines.map((line) => [...line].map((character,i) => (i + 1) % columnWidth ? character : columnMarker).join(''))
    const valuesMatrix = reversedLinesWithColumnMarker.map((line) => parseInputWithoutTrim<string>(line, (chunk) => chunk, columnMarker))
    const transposedValuesMatrix = valuesMatrix[0].map((_, c) => valuesMatrix.map((_, r) => valuesMatrix[r][c]))
    const transposedReversedLines = transposedValuesMatrix.map((row) => row.join(columnMarker))
    result = transposedReversedLines.join('\n')
  }
  return result
}

export function uniqueStringMatcher(nextSymbol: string, matchBuffer: string[]) {
  if (matchBuffer.includes(nextSymbol)) {
    const index = matchBuffer.findIndex((e) => e === nextSymbol) + 1
    matchBuffer.splice(0, index)
  }
  matchBuffer.push(nextSymbol)
}

export function findStartOfSequence<S>(input: S[], matcher: (nextSymbol: S, matchBuffer: S[]) => void, matchBufferLength = 4, offsetToMatchIndex = matchBufferLength): number {
  let result = -1
  const startOfSequenceIndexOffset = 1 - matchBufferLength + offsetToMatchIndex
  const matchBuffer: S[] = []

  for (let index = 0; index < input.length; index++) {
    const nextSymbol = input[index]
    matcher(nextSymbol, matchBuffer)
  if (matchBuffer.length === matchBufferLength) {
      result = index + startOfSequenceIndexOffset
      index = input.length
    }
  }
  return result
}

export function subset<T>(matrix: T[][], startRow: number, rowCount: number, startColumn: number, columnCount: number, ): T[][] {
  const result: T[][] = []
  const lastRowIndex = startRow + rowCount - 1
  if (startRow >= 0 && rowCount > 0 && lastRowIndex < matrix.length) {
    const lastColumnIndex = startColumn + columnCount - 1
    if (startColumn >= 0 && columnCount > 0 && lastColumnIndex < matrix[0].length) {
      for (let rowIndex = startRow; rowIndex <= lastRowIndex; rowIndex++) {
        let rowSubset: T[] = []
        for (let columnIndex = startColumn; columnIndex <= lastColumnIndex; columnIndex++) {
          rowSubset.push(matrix[rowIndex][columnIndex])
        }
        result.push(rowSubset)
        rowSubset = []
      }
    }
  }
  return result
}

export function initializeMatrix<T>(matrix: T[][], initialCellValue: T): T[][] {
  const result: T[][] = matrix.length > 0
    ? matrix.map((row) => row.length > 0
      ? row.map(() => initialCellValue)
      : [])
    : []
  return result
}

export function appendColumn<T>(matrix: T[][], initialCellValue: T): T[][] {
  const result: T[][] = matrix
  if (result.length > 0) {
    result.forEach((row) => row.push(initialCellValue))
  } else {
    result.push([initialCellValue])
  }
  return result
}

export function prependColumn<T>(matrix: T[][], initialCellValue: T): T[][] {
  const result: T[][] = matrix
  if (result.length > 0) {
    result.forEach((row) => row.splice(0, 0, initialCellValue))
  } else {
    result.push([initialCellValue])
  }
  return result
}

export function appendRow<T>(matrix: T[][], initialCellValue: T): T[][] {
  const result: T[][] = matrix
  if (result.length > 0) {
    const newRow = Array(result[0].length).fill(initialCellValue)
    result.push(newRow)
  } else {
    result.push([initialCellValue])
  }
  return result
}

export function prependRow<T>(matrix: T[][], initialCellValue: T): T[][] {
  const result: T[][] = matrix
  if (result.length > 0) {
    const newRow = Array(result[0].length).fill(initialCellValue)
    result.splice(0, 0, newRow)
  } else {
    result.push([initialCellValue])
  }
  return result
}

export function distanceInArray<T>(array: T[], criteriaFn: (value: T) => boolean, defaultDistance = array.length) {
  let result = 0
  if (array.length > 0) {
    const index = array.findIndex(criteriaFn)
    result = index < 0 ? defaultDistance : index + 1
  }
  return result
}

export function matrixReduce<T>(matrix: T[][], reducerFn: (acc: T, value: T) => T, initialValue: T): T {
  let result: T = initialValue

  if (matrix.length > 0) {
    matrix.forEach((row) => {
      if (row.length > 0) {
        row.forEach((value) => result = reducerFn(result, value))
      }
    })
  }

  return result
}

export type Coordinate2D = {
  row: number
  column: number
}
export function findCoordinate2D<T>(matrix: T[][], needle: T, fallBacks: (T | null)[] = []): Coordinate2D {
  const result: Coordinate2D = {row: -1, column: -1}
  const fallBackLocation: Coordinate2D = {row: -1, column: -1}
  if (matrix.length > 0) {
    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      const row = matrix[rowIndex];
      if (row.length > 0) {
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
          const cell = row[columnIndex];
          if (cell === needle) {
            result.row = rowIndex
            result.column = columnIndex
          } else if (fallBacks.length > 0) {
            fallBacks.forEach(fallBack => {
              if ((fallBackLocation.row < 0 || fallBackLocation.column < 0) && cell === fallBack) {
                fallBackLocation.row = rowIndex
                fallBackLocation.column = columnIndex
              } 
            })
          }
        }
      }
    }
  }
  return (result.row >= 0 && result.column >= 0) ? result : fallBackLocation
}

export function setMatrixValue<T>(matrix: T[][], coordinate: Coordinate2D, newValue: T) {
  if (0 <= coordinate.row && coordinate.row < matrix.length) {
    if (0 <= coordinate.column && coordinate.column < matrix[0].length) {
      matrix[coordinate.row][coordinate.column] = newValue
    }
  }
}
