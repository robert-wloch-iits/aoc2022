import {
  parseInput,
  Coordinate2D,
  findCoordinate2D,
  appendColumn,
  prependColumn,
  appendRow,
  prependRow,
  setMatrixValue,
  matrixReduce,
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
export type NextHeadCoordinateFnType = (headLocation: Coordinate2D) => Coordinate2D
export type ExpandMapsFnType = (ropeMap: RopeMapType, tailVisitMap: TailVisitMapType, headLocation: Coordinate2D) => void

function repeat(repeatFn: (ropeMap: RopeMapType, tailVisitMap: TailVisitMapType, nextHeadCoordinateFn: NextHeadCoordinateFnType, expandMapsFn: ExpandMapsFnType) => void, steps: number, ropeMap: RopeMapType, tailVisitMap: TailVisitMapType, nextHeadCoordinateFn: NextHeadCoordinateFnType, expandMapsFn: ExpandMapsFnType) {
  for (let s = 0; s < steps; s++) {
    repeatFn(ropeMap, tailVisitMap, nextHeadCoordinateFn, expandMapsFn)
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
  const rowSign = rowDistance < 0 ? -1 : 1
  const columnSign = columnDistance < 0 ? -1 : 1
  
  let moveRowDistance = 0
  let moveColumnDistance = 0
  if (Math.abs(rowDistance) + Math.abs(columnDistance) > 2 || isSameRow || isSameColumn) {
    moveRowDistance = rowSign * (isSameColumn ? Math.floor(0.5 * Math.abs(rowDistance)) : Math.ceil(0.5 * Math.abs(rowDistance)))
    moveColumnDistance = columnSign * (isSameRow ? Math.floor(0.5 * Math.abs(columnDistance)) : Math.ceil(0.5 * Math.abs(columnDistance)))
  }

  const nextRow = follower.row + moveRowDistance
  const nextColumn = follower.column + moveColumnDistance

  return {row: nextRow, column: nextColumn}
}

function move(ropeMap: RopeMapType, tailVisitMap: TailVisitMapType, nextHeadCoordinateFn: NextHeadCoordinateFnType, expandMapsFn: ExpandMapsFnType) {
  let headLocation: Coordinate2D = findCoordinate2D(ropeMap, 'H', ['s'])
  if (headLocation.row >= 0 && headLocation.column >= 0) {
    expandMapsFn(ropeMap, tailVisitMap, headLocation)
    headLocation = findCoordinate2D(ropeMap, 'H', ['s']) // need to update after possible expansion

    const nextHeadLocation: Coordinate2D = nextHeadCoordinateFn(headLocation)
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

function moveRight(steps: number, ropeMap: RopeMapType, tailVisitMap: TailVisitMapType) {
  const nextHeadCoordinateFn = (headLocation: Coordinate2D) => {
    return {...headLocation, column: headLocation.column + 1}
  }

  const expandMapsFn = (ropeMap: RopeMapType, tailVisitMap: TailVisitMapType, headLocation: Coordinate2D) => {
    if (headLocation.column === ropeMap[0].length - 1) {
      appendColumn<RopeType>(ropeMap, '.')
      appendColumn<TailVisitType>(tailVisitMap, 0)
    }
  }

  repeat(move, steps, ropeMap, tailVisitMap, nextHeadCoordinateFn, expandMapsFn)
}

function moveLeft(steps: number, ropeMap: RopeMapType, tailVisitMap: TailVisitMapType) {
  const nextHeadCoordinateFn = (headLocation: Coordinate2D) => {
    return {...headLocation, column: headLocation.column - 1}
  }

  const expandMapsFn = (ropeMap: RopeMapType, tailVisitMap: TailVisitMapType, headLocation: Coordinate2D) => {
    if (headLocation.column === 0) {
      prependColumn<RopeType>(ropeMap, '.')
      prependColumn<TailVisitType>(tailVisitMap, 0)
    }
  }

  repeat(move, steps, ropeMap, tailVisitMap, nextHeadCoordinateFn, expandMapsFn)
}

function moveUp(steps: number, ropeMap: RopeMapType, tailVisitMap: TailVisitMapType) {
  const nextHeadCoordinateFn = (headLocation: Coordinate2D) => {
    return {...headLocation, row: headLocation.row - 1}
  }

  const expandMapsFn = (ropeMap: RopeMapType, tailVisitMap: TailVisitMapType, headLocation: Coordinate2D) => {
    if (headLocation.row === 0) {
      prependRow<RopeType>(ropeMap, '.')
      prependRow<TailVisitType>(tailVisitMap, 0)
    }
  }

  repeat(move, steps, ropeMap, tailVisitMap, nextHeadCoordinateFn, expandMapsFn)
}

function moveDown(steps: number, ropeMap: RopeMapType, tailVisitMap: TailVisitMapType) {
  const nextHeadCoordinateFn = (headLocation: Coordinate2D) => {
    return {...headLocation, row: headLocation.row + 1}
  }

  const expandMapsFn = (ropeMap: RopeMapType, tailVisitMap: TailVisitMapType, headLocation: Coordinate2D) => {
    if (headLocation.row === ropeMap.length - 1) {
      appendRow<RopeType>(ropeMap, '.')
      appendRow<TailVisitType>(tailVisitMap, 0)
    }
  }

  repeat(move, steps, ropeMap, tailVisitMap, nextHeadCoordinateFn, expandMapsFn)
}

export function executeCommands(motions: Motion[], ropeMap: RopeMapType, tailVisitMap: TailVisitMapType) {
  if (motions.length > 0) {
    motions.forEach((motion) => {
      switch(motion.command) {
        case 'R' as CommandType: 
          moveRight(motion.steps, ropeMap, tailVisitMap)
          break
        case 'L' as CommandType: 
          moveLeft(motion.steps, ropeMap, tailVisitMap)
          break
        case 'U' as CommandType: 
          moveUp(motion.steps, ropeMap, tailVisitMap)
          break
        case 'D' as CommandType: 
          moveDown(motion.steps, ropeMap, tailVisitMap)
          break
      }
    })
  }
}

export function countVisitedPositions(input: string): number {
  const commands: Motion[] = parseMotions(input)
  const ropeMap: RopeMapType = [['s']]
  const tailVisitMap: TailVisitMapType = [['s']]
  executeCommands(commands, ropeMap, tailVisitMap)

  const reducerFn = (acc: TailVisitType, value: TailVisitType) => 0 as TailVisitType === value ? +acc : +acc + 1
  const result = matrixReduce<TailVisitType>(tailVisitMap, reducerFn, 0)

  return +result
}
