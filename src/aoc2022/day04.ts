import {parseInput} from '@/aoc2022/utils'

export type AssignmentType = {
  startSection: number|undefined
  endSection: number|undefined
}
export function createAssignmentType(assignmentChunk: string): AssignmentType {
  const sectionRange = parseInput<number>(assignmentChunk, (chunk) => +chunk, '-')
  return {startSection: sectionRange[0], endSection: sectionRange[1]}
}
