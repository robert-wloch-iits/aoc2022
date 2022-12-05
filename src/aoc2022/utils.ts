export function parseInput<C>(input: string, typeFactoryFn: (chunk: string) => C, delimiter = '\n'): C[] {
  const inputChunksArray = input?.trim() ? input.trim().split(delimiter) : []
  const result: C[] = []
  if (inputChunksArray?.length > 0) {
    inputChunksArray.forEach(chunkAsString => {
      result.push(typeFactoryFn(chunkAsString.trim()))
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
