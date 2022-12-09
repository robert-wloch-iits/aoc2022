import {parseInput, initializeMatrix} from '@/aoc2022/utils'

export type CommandType = ('U'|'D'|'L'|'R')
export type Motion = {
  command: CommandType
  steps: number
}
export function parseMotions(input: string): Motion[] {
  const result = parseInput<Motion>(input, (rowChunk) => {
    const rowParts = parseInput<string>(rowChunk, (chunk) => chunk, ' ')
    return {command: rowParts[0] as CommandType, steps: +rowParts[1]}
  })
  return result
}

export type RopeMapType = ('.'|'s'|'T'|'H')[][]
export type TailVisitMapType = ('s'|number)[][]
export function executeCommand(commands: Motion[], ropeMap: RopeMapType = [['s']], tailVisitMap: TailVisitMapType = [['s']]) {
  
}