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
