import {uniqueStringMatcher, findStartOfSequence} from '@/aoc2022/utils'

export function findStartOfSequenceMarker(input: string, bufferLength = 4): number {
  return findStartOfSequence<string>([...input], uniqueStringMatcher, bufferLength)
}
