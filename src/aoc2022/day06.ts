export function findStartOfSequenceMarker(input: string, bufferLength = 4): number {
  let result = -1
  const markerBuffer: string[] = []

  for (let index = 0; index < input.length; index++) {
    const symbol = input.charAt(index)
    
    if (markerBuffer.includes(symbol)) {
      const index = markerBuffer.findIndex((e) => e === symbol) + 1
      markerBuffer.splice(0, index)
    }
    markerBuffer.push(symbol)
  if (markerBuffer.length === bufferLength) {
      result = index + 1
      index = input.length
    }
  }
  return result
}
