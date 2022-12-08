import {parseInput, subset} from '@/aoc2022/utils'


export function parseHeightMap(input: string): number[][] {
  const result: number[][] = input ? parseInput<number[]>(input, (lineChunk) => {
    const lineResult: number[] = lineChunk ? [...lineChunk].map((cell) => +cell) : []
    return lineResult
  }) : []
  return result
}

export function countVisibleTrees(heightMap: number[][]): number {
  let result = heightMap.length > 0 ? heightMap.length * heightMap[0].length : 0
  const rowStart = 1
  const rowCount = Math.max(heightMap.length - 2 * rowStart, 0)
  const columnStart = 1
  const columnCount = heightMap.length > 0 ? Math.max(heightMap[0].length - 2 * columnStart, 0) : 0

  const lastRowIndex = rowStart + rowCount - 1
  if (rowStart >= 0 && rowCount > 0 && lastRowIndex < heightMap.length) {
    const lastColumnIndex = columnStart + columnCount - 1
    if (columnStart >= 0 && columnCount > 0 && lastColumnIndex < heightMap[0].length) {
      result = 2 * (heightMap.length - 1 + heightMap[0].length - 1)

      for (let rowIndex = rowStart; rowIndex <= lastRowIndex; rowIndex++) {
        for (let columnIndex = columnStart; columnIndex <= lastColumnIndex; columnIndex++) {
          const cellValue = heightMap[rowIndex][columnIndex]

          const leftRowPart = subset<number>(heightMap, rowIndex, 1, 0, columnIndex).flat()
          const rightRowPart = subset<number>(heightMap, rowIndex, 1, columnIndex + 1, lastColumnIndex - columnIndex + 1).flat()
          const topColumnPart = subset<number>(heightMap, 0, rowIndex, columnIndex, 1).flat()
          const bottomColumnPart = subset<number>(heightMap, rowIndex + 1, lastRowIndex - rowIndex + 1, columnIndex, 1).flat()
          
          const isVisibleFromLeft = Math.max(...leftRowPart) < cellValue
          const isVisibleFromRight = Math.max(...rightRowPart) < cellValue
          const isVisibleFromTop = Math.max(...topColumnPart) < cellValue
          const isVisibleFromBottom = Math.max(...bottomColumnPart) < cellValue
          
          const isVisible = isVisibleFromLeft || isVisibleFromRight || isVisibleFromTop || isVisibleFromBottom

          result += isVisible ? 1 : 0
        }
      }

    }
  }
  return result
}