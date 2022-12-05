import {parseInput, parseInputWithoutTrim, transposeReversedLines} from '@/aoc2022/utils'

const columnMarker = '|'

export type StackType = {
  crates: string[]
}
export function createStackType(stackChunk: string): StackType {
  let crates = parseInput<string>(stackChunk, (chunk) => chunk, columnMarker).slice(1)
  let index = crates.length - 1
  while (index >= 0) {
    if (crates[index] === '') {
      crates = crates.splice(0, index)
      index--
    } else {
      index = -1
    }
  }
  return {crates}
}

export type StartingStacksType = {
  stacks: StackType[]
}

export function createStartingStacksType(startingStacksChunk: string): StartingStacksType {
  const transposedStartingStacks = transposeReversedLines(startingStacksChunk, 4, columnMarker)
  
  const stackList = parseInputWithoutTrim<string>(transposedStartingStacks, (chunk) => chunk)
  
  const stacks = (stackList?.length > 0) ? stackList.map((stackChunk) => createStackType(stackChunk)): []

  return {stacks}
}

export type RearrangementType = {
  quantity: number
  fromStackId: number
  toStackId: number
}
export function createRearrangementType(rearrangementChunk: string): RearrangementType|null {
  let result: RearrangementType|null = null
  if (rearrangementChunk) {
    const rearrangementSteps = parseInput<string>(rearrangementChunk, (chunk) => chunk, ' ')
    if (rearrangementSteps?.length === 6) {
      result = {
        quantity: +rearrangementSteps[1],
        fromStackId: +rearrangementSteps[3],
        toStackId: +rearrangementSteps[5],
      }
    }
  }
  return result
}

export type RearrangementProcedureType = {
  rearrangementProcedures: RearrangementType[]
}
export function createRearrangementProcedureType(rearrangementProcedureChunk: string): RearrangementProcedureType {
  const rearrangementProcedures = parseInput<RearrangementType|null>(rearrangementProcedureChunk, createRearrangementType).filter((e) => e) as RearrangementType[]
  return {rearrangementProcedures}
}

export type CraneOperationType = {
  stacks: StackType[]
  rearrangementProcedures: RearrangementType[]
}
export function parseCraneOperationType(input: string): CraneOperationType {
  let result: CraneOperationType = {stacks: [], rearrangementProcedures: []}
  const inputParts = input ? input.split('\n\n') : []
  if (inputParts?.length === 2) {
    const {stacks} = createStartingStacksType(inputParts[0])
    const {rearrangementProcedures} = createRearrangementProcedureType(inputParts[1])
    result = {stacks, rearrangementProcedures}
  }
  return result
}

export function rearrangeStacks(craneOperations: CraneOperationType, isMultiGrabber = false): StackType[] {
  const result: StackType[] = craneOperations.stacks
  const maxStackId = result.length
  const operations = craneOperations.rearrangementProcedures

  if (operations?.length > 0) {
    operations.forEach((operation) => {
      const {fromStackId: from, toStackId: to, quantity} = operation
      if (operation.fromStackId < 1 || operation.fromStackId > maxStackId ||
        operation.toStackId < 1 || operation.toStackId > maxStackId) {
          throw new Error(`rearrangement procedure 'move ${quantity} from ${from} to ${to}' uses unknown stack! Highest allowed step id is: ${maxStackId}`)
        }

      let staple: string[] = []
      for (let count = 0; count < quantity; count++) {
        const element = result[from - 1].crates.pop()
        if (element) {
          staple.push(element)
        }
      }
      if (staple.length > 0) {
        if (isMultiGrabber) {
          staple.reverse()
        }
        result[to - 1].crates.push(...staple)
        staple = []
      }
   })
  }

  return result
}

export function collectTopCratesAfterCraneOperations(stacks: StackType[]): string {
  const result: string[] = stacks?.length > 0 ? stacks.map((stack) => stack.crates.length > 0 ? stack.crates[stack.crates.length - 1] : ' ') : []
  return result.join('').replaceAll('[', '').replaceAll(']', '')
}