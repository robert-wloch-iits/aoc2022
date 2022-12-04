import {parseInput} from '@/aoc2022/utils'

export type AssignmentType = {
  startSection: number|undefined
  endSection: number|undefined
}
export function createAssignmentType(assignmentChunk: string): AssignmentType {
  const sectionRange = parseInput<number>(assignmentChunk, (chunk) => +chunk, '-')
  return {startSection: sectionRange[0], endSection: sectionRange[1]}
}

export type AssignmentPairType = {
  first: AssignmentType|undefined
  second: AssignmentType|undefined
}
export function createAssignmentPairType(assignmentPairChunk: string): AssignmentPairType {
  const assignmentjobPairs = parseInput<AssignmentType>(assignmentPairChunk, createAssignmentType, ',')
  return {first:assignmentjobPairs[0], second:assignmentjobPairs[1]}
}
