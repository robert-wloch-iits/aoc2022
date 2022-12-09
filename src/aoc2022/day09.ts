import {
  parseInput,
  Coordinate2D,
  findCoordinate2D,
  appendColumn,
  setMatrixValue,
} from '@/aoc2022/utils'

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

export type RopeType = ('.'|'s'|'T'|'H')
export type RopeMapType = RopeType[][]
export type TailVisitType = ('s'|number)
export type TailVisitMapType = TailVisitType[][]

function repeat(repeatFn: (ropeMap: RopeMapType, tailVisitMap: TailVisitMapType) => void, steps: number, ropeMap: RopeMapType, tailVisitMap: TailVisitMapType) {
  for (let s = 0; s < steps; s++) {
    repeatFn(ropeMap, tailVisitMap)
  }
}

function updateVisitCounter(tailVisitMap: TailVisitMapType, previousCoordinate: Coordinate2D, coordinate: Coordinate2D) {
  if (previousCoordinate.row !== coordinate.row || previousCoordinate.column !== coordinate.column) {
    const nextTailVisitCell = tailVisitMap[coordinate.row][coordinate.column]
    const nextVisitCounter: TailVisitType = 's' as TailVisitType === nextTailVisitCell ? 's' : +nextTailVisitCell + 1
    setMatrixValue(tailVisitMap, coordinate, nextVisitCounter)
  }
}

function pullClose(lead: Coordinate2D, follower: Coordinate2D): Coordinate2D {
  const isSameRow = lead.row === follower.row
  const isSameColumn = lead.column === follower.column

  const rowDistance = lead.row - follower.row
  const columnDistance = lead.column - follower.column

  const moveRowDistance = isSameColumn ? Math.floor(0.5 * rowDistance) : Math.ceil(0.5 * rowDistance)
  const moveColumnDistance = isSameRow ? Math.floor(0.5 * columnDistance) : Math.ceil(0.5 * columnDistance)

  const nextRow = follower.row + moveRowDistance
  const nextColumn = follower.column + moveColumnDistance

  return {row: nextRow, column: nextColumn}
}

function moveRight(ropeMap: RopeMapType, tailVisitMap: TailVisitMapType) {
  const headLocation: Coordinate2D = findCoordinate2D(ropeMap, 'H', ['s'])
  if (headLocation.row >= 0 && headLocation.column >= 0) {
    if (headLocation.column === ropeMap[0].length - 1) {
      appendColumn<RopeType>(ropeMap, '.')
      appendColumn<TailVisitType>(tailVisitMap, 0)
    }
    const nextHeadLocation: Coordinate2D = {...headLocation, column: headLocation.column + 1}
    const tailLocation: Coordinate2D = findCoordinate2D(ropeMap, 'T', ['s', 'H'])
    const nextTailLocation: Coordinate2D = pullClose(nextHeadLocation, tailLocation)

    if ('s' as RopeType !== ropeMap[headLocation.row][headLocation.column]) {
      setMatrixValue(ropeMap, headLocation, '.') // clear old head
    }
    if ('s' as RopeType !== ropeMap[tailLocation.row][tailLocation.column]) {
      setMatrixValue(ropeMap, tailLocation, '.') // clear old tail
    }
    if ('s' as RopeType !== ropeMap[nextTailLocation.row][nextTailLocation.column]) {
      setMatrixValue(ropeMap, nextTailLocation, 'T') // set new tail
      updateVisitCounter(tailVisitMap, tailLocation, nextTailLocation)
    }
    if ('s' as RopeType !== ropeMap[nextHeadLocation.row][nextHeadLocation.column]) {
      setMatrixValue(ropeMap, nextHeadLocation, 'H') // new head may overwrite 'T'
    }
  }
}

export function executeCommand(motions: Motion[], ropeMap: RopeMapType, tailVisitMap: TailVisitMapType) {
  if (motions.length > 0) {
    motions.forEach((motion) => {
      switch(motion.command) {
        case 'R' as CommandType: 
          repeat(moveRight, motion.steps, ropeMap, tailVisitMap)
          break
      }
    })
  }
}
