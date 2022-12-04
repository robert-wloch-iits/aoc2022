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

export function isContainingOtherAssignmentFully(assignmentPair: AssignmentPairType): boolean {
  let result = false
  if (
    assignmentPair.first?.startSection !== undefined &&
    assignmentPair.first.endSection !== undefined &&
    assignmentPair.second?.startSection !== undefined &&
    assignmentPair.second.endSection !== undefined) {
      const isFirstFullyContainedInSecond = assignmentPair.first.startSection >= assignmentPair.second.startSection && assignmentPair.first.endSection <= assignmentPair.second.endSection
      const isSecondFullyContainedInFirst = assignmentPair.second.startSection >= assignmentPair.first.startSection && assignmentPair.second.endSection <= assignmentPair.first.endSection
      result = isFirstFullyContainedInSecond || isSecondFullyContainedInFirst
    }
  return result
}

export function parseAssignmentPairs(input: string): AssignmentPairType[] {
  const result: AssignmentPairType[] = parseInput<AssignmentPairType>(input, createAssignmentPairType)
  return result
}
