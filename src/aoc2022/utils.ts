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
