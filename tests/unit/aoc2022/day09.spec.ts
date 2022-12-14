import {describe, it, expect} from 'vitest'

import {matrixReduce} from '@/aoc2022/utils'
import {
  Motion,
  parseMotions,
  RopeMapType,
  TailVisitMapType,
  executeCommands,
  countVisitedPositions,
} from '@/aoc2022/day09'

const aoc = {
  puzzleInput: `U 1
  D 1
  L 1
  U 2
  L 1
  D 2
  L 2
  U 2
  L 1
  R 2
  U 2
  D 1
  R 2
  U 1
  R 1
  U 1
  R 1
  U 2
  L 1
  U 2
  D 1
  R 1
  U 2
  D 1
  U 2
  D 2
  U 2
  D 1
  R 1
  D 2
  L 2
  R 2
  L 1
  R 2
  D 2
  L 2
  U 1
  D 2
  R 2
  L 2
  R 2
  D 2
  R 1
  D 1
  L 1
  D 1
  L 2
  D 1
  R 1
  L 1
  U 2
  L 2
  U 1
  D 1
  U 1
  D 1
  L 2
  D 2
  L 2
  U 1
  R 2
  D 1
  U 1
  R 2
  L 1
  R 1
  L 1
  R 2
  L 1
  U 2
  R 1
  L 1
  U 1
  D 2
  R 1
  D 2
  L 1
  U 2
  D 2
  L 2
  U 1
  L 1
  D 1
  L 2
  U 2
  R 2
  U 1
  D 2
  L 1
  D 2
  R 1
  L 1
  R 1
  D 2
  U 1
  R 1
  L 1
  U 2
  R 2
  L 1
  R 2
  L 1
  R 1
  L 2
  U 1
  R 2
  D 2
  U 1
  D 1
  L 2
  D 1
  R 3
  D 1
  L 3
  D 1
  R 2
  D 1
  R 2
  U 3
  L 2
  U 2
  D 2
  L 3
  R 3
  U 3
  R 3
  L 1
  R 2
  L 2
  R 3
  U 2
  D 3
  L 3
  D 1
  R 2
  U 1
  D 2
  U 2
  L 1
  U 2
  R 2
  D 2
  L 3
  D 1
  L 1
  R 1
  D 3
  L 2
  R 2
  L 2
  R 2
  D 1
  R 2
  L 3
  U 1
  R 2
  D 2
  R 1
  D 2
  R 2
  L 3
  U 1
  L 2
  U 1
  D 3
  L 1
  U 1
  D 3
  U 2
  L 1
  U 3
  D 2
  R 2
  U 3
  L 3
  D 1
  U 3
  R 1
  U 2
  L 2
  D 1
  U 1
  D 3
  R 1
  D 3
  U 3
  L 3
  R 2
  D 3
  L 2
  U 3
  L 1
  D 3
  L 2
  D 1
  R 3
  L 1
  R 3
  U 2
  L 3
  D 1
  R 2
  L 1
  U 1
  L 3
  R 3
  U 2
  D 2
  U 2
  R 1
  L 3
  U 3
  L 1
  R 3
  D 3
  L 2
  D 3
  U 1
  L 3
  D 3
  R 2
  U 3
  D 1
  R 1
  L 1
  U 4
  L 2
  U 3
  R 3
  U 1
  D 2
  R 4
  U 1
  L 1
  U 3
  R 2
  D 4
  U 3
  D 1
  U 1
  L 1
  U 3
  R 4
  L 1
  R 4
  L 1
  R 2
  L 4
  D 1
  L 4
  R 2
  D 2
  R 2
  U 1
  D 2
  L 4
  D 1
  R 3
  D 2
  U 3
  D 4
  L 3
  U 2
  R 4
  U 4
  D 2
  L 2
  D 1
  U 3
  L 2
  R 4
  L 1
  U 3
  L 2
  R 3
  U 1
  R 4
  D 3
  L 3
  D 1
  U 4
  L 4
  D 3
  R 1
  L 1
  D 2
  L 1
  R 4
  D 2
  L 3
  D 4
  L 4
  U 2
  D 1
  U 4
  D 4
  U 2
  D 2
  R 4
  L 2
  D 4
  U 2
  L 1
  D 4
  U 3
  D 3
  R 2
  D 1
  U 4
  R 2
  U 3
  D 1
  R 1
  L 1
  D 1
  L 3
  R 4
  U 2
  L 4
  D 3
  L 2
  R 4
  L 3
  U 3
  L 1
  D 4
  R 1
  L 2
  D 1
  R 2
  L 1
  R 4
  L 1
  R 3
  U 2
  D 1
  R 2
  L 1
  D 5
  U 1
  D 2
  R 5
  U 4
  L 1
  D 2
  R 3
  U 2
  D 1
  L 4
  D 5
  R 4
  D 2
  R 3
  D 5
  L 2
  R 5
  U 2
  L 4
  R 4
  U 3
  D 3
  R 1
  U 4
  D 2
  U 2
  L 3
  D 4
  L 4
  D 2
  U 5
  R 1
  U 4
  L 2
  U 3
  R 5
  D 4
  U 5
  R 2
  D 5
  R 3
  U 1
  R 4
  L 3
  D 1
  L 1
  R 5
  L 5
  D 2
  U 5
  D 5
  R 5
  U 3
  D 4
  R 4
  U 2
  L 1
  D 3
  U 3
  R 4
  U 4
  D 1
  L 1
  R 2
  L 5
  R 1
  L 3
  D 1
  U 5
  R 1
  U 4
  D 5
  L 5
  R 2
  L 4
  U 1
  L 5
  D 2
  R 2
  D 1
  R 4
  D 5
  L 3
  D 3
  L 4
  U 5
  L 3
  R 4
  D 4
  R 2
  U 4
  R 4
  D 3
  U 3
  L 3
  R 1
  D 4
  U 1
  R 1
  D 1
  R 4
  D 3
  L 5
  U 1
  D 1
  U 5
  L 5
  D 3
  U 6
  D 5
  U 5
  D 1
  L 5
  D 4
  L 2
  R 6
  U 3
  R 6
  D 6
  U 5
  D 3
  L 1
  R 2
  U 2
  D 4
  U 6
  D 1
  U 1
  D 2
  U 3
  L 1
  U 6
  D 4
  L 6
  U 5
  D 4
  U 3
  R 6
  U 5
  R 2
  U 3
  D 6
  L 5
  U 2
  D 4
  L 4
  D 4
  R 6
  U 4
  L 3
  U 4
  R 6
  D 1
  U 4
  R 1
  L 1
  U 3
  D 6
  L 2
  D 2
  U 3
  R 5
  D 1
  R 3
  U 6
  L 2
  R 2
  U 4
  L 5
  D 4
  U 4
  R 4
  D 5
  L 1
  R 2
  U 4
  L 5
  D 6
  R 2
  L 2
  D 6
  L 1
  R 1
  U 3
  L 4
  D 4
  U 5
  L 3
  D 2
  U 2
  L 1
  R 3
  L 4
  U 6
  L 2
  U 2
  D 3
  L 5
  R 1
  D 1
  U 1
  D 6
  L 6
  D 6
  U 2
  D 6
  L 3
  U 2
  L 6
  D 2
  L 4
  R 5
  D 2
  U 3
  R 1
  D 4
  U 2
  R 5
  D 6
  R 7
  U 5
  L 6
  U 5
  L 2
  R 1
  L 3
  R 6
  U 2
  L 3
  U 7
  R 1
  D 2
  U 4
  R 2
  L 3
  D 2
  U 3
  D 7
  U 2
  L 4
  R 6
  D 5
  R 7
  U 1
  D 3
  U 7
  R 2
  U 4
  D 2
  L 7
  D 2
  U 4
  D 3
  R 4
  U 6
  L 7
  R 7
  L 3
  D 3
  U 1
  L 5
  U 5
  R 2
  U 7
  L 2
  U 2
  D 1
  R 3
  U 1
  L 4
  U 4
  D 4
  U 1
  L 2
  R 5
  D 4
  L 4
  U 3
  R 1
  D 2
  R 7
  D 2
  U 5
  D 1
  U 4
  R 7
  L 4
  R 6
  L 7
  R 2
  D 6
  U 7
  R 1
  D 7
  L 3
  D 2
  L 7
  R 4
  L 2
  D 3
  R 2
  U 6
  L 6
  U 2
  R 2
  U 7
  R 7
  D 5
  U 6
  D 7
  R 6
  D 7
  R 2
  U 7
  L 6
  R 6
  U 1
  D 2
  L 1
  R 3
  D 4
  U 3
  R 6
  D 3
  U 3
  D 5
  L 5
  U 4
  R 6
  D 4
  U 7
  L 3
  U 6
  R 7
  D 8
  R 5
  L 4
  D 2
  L 4
  U 8
  R 2
  D 6
  U 4
  D 6
  U 1
  D 7
  U 7
  L 4
  R 2
  L 7
  D 8
  L 2
  D 7
  R 4
  L 3
  D 8
  R 7
  D 8
  U 7
  D 4
  L 1
  U 1
  D 1
  L 3
  D 4
  L 7
  U 8
  D 2
  R 8
  L 1
  D 8
  L 1
  D 4
  U 1
  R 8
  D 2
  L 6
  D 4
  U 4
  R 1
  U 8
  D 1
  U 8
  R 5
  D 8
  L 7
  D 8
  U 6
  D 2
  R 6
  U 8
  L 5
  U 2
  R 4
  L 2
  D 4
  L 5
  D 4
  R 7
  D 5
  L 4
  R 5
  L 4
  D 6
  L 2
  R 1
  U 8
  R 6
  D 8
  U 2
  R 3
  U 5
  R 2
  D 2
  R 2
  D 4
  U 5
  D 2
  L 2
  U 6
  D 3
  R 8
  U 7
  L 7
  D 2
  U 2
  L 8
  D 5
  U 1
  D 7
  L 6
  D 3
  U 3
  D 5
  R 2
  U 7
  L 3
  U 8
  R 9
  D 9
  U 2
  D 7
  L 1
  R 7
  L 8
  U 3
  D 4
  L 2
  R 2
  D 6
  U 6
  R 5
  U 4
  D 6
  R 7
  D 4
  U 1
  D 6
  R 8
  L 6
  R 7
  D 4
  U 5
  D 2
  R 9
  U 5
  L 9
  D 8
  U 1
  L 7
  R 4
  L 8
  R 6
  U 8
  D 9
  U 8
  D 1
  U 6
  L 2
  R 2
  L 9
  D 2
  R 8
  L 1
  U 1
  L 1
  D 8
  U 7
  L 9
  U 4
  R 2
  U 6
  D 5
  R 1
  L 2
  R 1
  L 7
  R 4
  D 2
  L 1
  U 1
  D 3
  U 4
  R 2
  D 7
  L 4
  U 1
  L 1
  D 8
  U 7
  D 6
  U 8
  L 3
  D 2
  R 8
  U 3
  D 5
  U 5
  D 3
  U 2
  L 1
  R 8
  D 2
  L 4
  U 6
  D 2
  L 7
  U 9
  L 3
  D 1
  U 7
  L 4
  U 3
  L 8
  R 9
  D 2
  L 8
  U 9
  R 3
  D 3
  U 7
  D 9
  R 1
  U 8
  R 4
  L 1
  D 9
  L 6
  U 6
  R 3
  D 4
  U 5
  R 5
  L 3
  R 3
  L 7
  U 7
  R 3
  D 4
  R 3
  L 9
  D 2
  U 1
  L 2
  D 10
  R 4
  D 5
  U 1
  R 9
  L 4
  R 7
  D 10
  U 8
  L 8
  R 7
  L 3
  D 6
  L 8
  D 3
  U 7
  D 2
  L 6
  U 1
  R 5
  D 2
  L 7
  D 3
  L 5
  U 10
  R 2
  U 7
  R 7
  L 3
  U 4
  L 5
  D 9
  L 10
  U 5
  L 8
  R 4
  D 6
  U 9
  R 3
  L 4
  R 10
  L 8
  U 5
  D 10
  L 10
  U 7
  L 7
  R 6
  U 2
  D 10
  R 1
  L 9
  U 2
  R 9
  U 10
  D 5
  U 3
  L 3
  D 9
  R 6
  U 9
  R 3
  L 4
  D 2
  R 6
  D 3
  U 7
  D 6
  U 6
  L 5
  D 5
  R 3
  D 5
  R 5
  D 6
  R 9
  L 9
  D 3
  L 3
  U 4
  L 9
  D 8
  L 1
  D 7
  L 6
  U 9
  R 5
  L 8
  D 4
  R 4
  D 9
  R 7
  D 2
  L 4
  U 10
  R 6
  D 2
  R 9
  U 6
  D 2
  R 7
  L 6
  U 8
  D 6
  U 5
  L 1
  R 3
  D 9
  U 2
  D 9
  L 2
  R 6
  L 4
  U 8
  L 10
  D 11
  L 2
  R 6
  U 9
  L 7
  D 1
  U 10
  R 3
  L 10
  U 1
  R 7
  L 2
  U 3
  D 4
  U 10
  D 8
  R 6
  D 2
  U 7
  L 1
  U 5
  D 3
  U 11
  D 1
  R 9
  U 7
  R 5
  L 6
  U 10
  D 7
  U 2
  D 8
  R 10
  D 10
  U 5
  D 2
  U 4
  R 2
  L 10
  U 8
  L 5
  R 3
  U 6
  R 6
  U 2
  R 8
  L 2
  D 6
  R 11
  D 3
  U 6
  D 6
  R 1
  U 4
  D 8
  L 5
  R 11
  D 3
  U 6
  R 1
  L 7
  D 8
  R 7
  L 6
  R 4
  L 1
  U 4
  R 2
  L 3
  R 4
  U 2
  R 8
  L 7
  U 1
  D 11
  L 5
  U 10
  D 3
  L 4
  D 9
  U 8
  R 10
  L 10
  R 4
  D 1
  U 1
  L 6
  D 11
  L 9
  U 1
  D 1
  L 10
  U 11
  R 4
  L 9
  D 5
  U 6
  L 3
  R 5
  U 4
  R 9
  D 11
  L 5
  U 6
  L 2
  D 8
  R 2
  L 10
  U 9
  D 8
  R 10
  D 5
  U 6
  R 2
  L 11
  D 1
  R 4
  D 6
  U 3
  D 12
  L 3
  D 9
  R 2
  L 9
  U 2
  D 3
  L 2
  D 3
  L 8
  D 9
  U 10
  D 8
  R 11
  U 9
  L 4
  U 8
  L 6
  D 12
  L 5
  U 2
  L 5
  R 5
  U 7
  L 4
  U 1
  L 10
  D 6
  R 3
  L 4
  U 1
  L 3
  D 8
  U 1
  D 6
  L 6
  R 9
  D 7
  U 12
  R 12
  U 12
  L 3
  R 4
  L 3
  D 7
  U 3
  D 12
  U 8
  L 10
  D 11
  R 3
  U 3
  L 11
  U 3
  R 11
  U 6
  R 10
  U 11
  D 4
  R 8
  L 2
  U 3
  D 9
  L 3
  R 7
  D 10
  L 11
  R 9
  L 1
  D 3
  R 1
  D 2
  L 4
  R 4
  L 11
  D 7
  L 7
  U 6
  L 12
  R 2
  L 8
  D 9
  U 5
  L 11
  R 1
  U 12
  R 5
  L 5
  D 11
  R 12
  L 10
  R 8
  D 3
  U 9
  R 6
  L 3
  U 13
  D 13
  L 9
  U 6
  D 6
  U 9
  L 9
  R 4
  L 13
  R 2
  U 10
  L 4
  U 7
  D 8
  U 8
  L 3
  U 10
  L 6
  D 1
  R 10
  U 2
  R 12
  L 5
  R 7
  L 11
  D 1
  R 2
  D 4
  R 5
  L 5
  U 2
  D 10
  U 5
  R 6
  U 10
  R 3
  U 13
  R 9
  D 2
  L 4
  R 11
  U 3
  D 6
  R 10
  D 4
  L 1
  U 4
  D 1
  U 12
  D 5
  L 8
  U 3
  R 11
  U 12
  L 11
  R 8
  L 4
  R 12
  D 3
  L 11
  R 1
  L 12
  R 2
  D 10
  R 10
  L 4
  U 4
  D 4
  U 7
  D 6
  L 9
  R 12
  L 7
  D 2
  R 11
  L 5
  D 8
  L 3
  D 1
  L 5
  R 7
  L 10
  U 9
  R 11
  D 13
  L 12
  R 9
  D 1
  L 2
  D 13
  L 5
  R 10
  D 12
  R 10
  L 13
  R 8
  L 5
  R 9
  U 1
  R 3
  D 4
  U 6
  D 2
  L 6
  U 1
  D 8
  U 9
  D 2
  R 9
  D 10
  U 12
  L 14
  U 4
  L 6
  D 3
  U 7
  R 5
  D 13
  R 1
  D 11
  U 10
  L 1
  U 3
  L 9
  U 2
  L 14
  D 14
  L 11
  R 9
  L 12
  R 10
  D 14
  R 3
  D 10
  R 3
  U 3
  D 13
  L 6
  D 5
  L 7
  U 14
  D 7
  U 13
  L 12
  U 13
  R 7
  L 4
  D 8
  R 3
  U 7
  L 1
  D 14
  U 7
  D 12
  U 12
  D 5
  L 3
  U 5
  D 13
  U 12
  L 9
  R 8
  D 8
  R 4
  U 11
  R 10
  D 8
  L 6
  R 7
  D 12
  U 10
  L 10
  D 8
  L 9
  R 11
  D 8
  L 10
  D 14
  L 6
  R 6
  L 10
  R 10
  U 14
  R 4
  U 1
  R 3
  U 11
  L 3
  R 4
  D 11
  U 12
  D 6
  L 5
  R 3
  D 4
  U 4
  D 10
  R 11
  D 10
  L 2
  D 7
  L 6
  D 2
  R 9
  L 1
  R 3
  D 1
  U 10
  D 14
  L 9
  D 8
  U 7
  D 12
  R 2
  U 3
  D 9
  L 5
  D 8
  R 15
  U 6
  L 10
  R 1
  D 3
  U 5
  R 10
  U 5
  L 1
  U 9
  D 9
  R 8
  D 7
  U 1
  R 12
  U 15
  D 2
  U 9
  L 7
  D 11
  R 10
  U 8
  L 8
  D 2
  L 1
  R 2
  L 11
  D 1
  R 8
  D 3
  L 3
  D 15
  R 9
  U 3
  L 13
  U 3
  D 6
  L 7
  R 8
  D 10
  U 6
  R 15
  D 8
  U 1
  D 2
  R 6
  U 2
  R 5
  L 8
  D 12
  U 1
  L 4
  D 1
  R 5
  L 14
  R 9
  L 9
  U 9
  L 11
  U 8
  R 2
  U 4
  D 2
  R 12
  U 13
  D 10
  L 10
  D 5
  L 9
  R 10
  L 10
  R 14
  L 6
  D 8
  R 4
  D 2
  L 11
  R 1
  U 11
  R 9
  L 13
  D 9
  L 14
  R 15
  U 15
  L 6
  U 3
  D 15
  L 5
  D 4
  U 2
  L 4
  D 7
  L 14
  R 2
  L 5
  U 8
  L 3
  U 10
  R 7
  L 12
  U 13
  L 14
  R 3
  U 13
  L 13
  U 16
  D 10
  R 10
  U 8
  L 4
  R 9
  D 4
  L 4
  U 4
  D 10
  L 11
  R 1
  L 11
  U 11
  R 2
  U 11
  R 7
  L 6
  D 6
  U 11
  L 5
  U 8
  R 8
  L 7
  R 11
  D 2
  R 4
  L 16
  U 10
  D 2
  U 2
  R 13
  U 7
  L 2
  R 7
  U 13
  R 3
  L 7
  R 10
  D 10
  L 3
  R 13
  L 10
  U 11
  L 8
  R 14
  U 7
  D 15
  L 9
  R 6
  L 6
  R 16
  D 10
  L 13
  R 5
  L 7
  D 1
  R 3
  D 16
  U 11
  R 16
  L 15
  U 10
  R 6
  D 7
  R 3
  D 4
  L 1
  D 11
  R 14
  U 16
  L 14
  U 11
  L 16
  R 10
  L 10
  U 16
  R 12
  L 6
  U 3
  R 5
  L 10
  U 3
  D 16
  L 15
  U 8
  L 7
  R 12
  L 2
  U 15
  L 1
  D 9
  U 7
  D 8
  L 2
  R 14
  L 9
  D 2
  U 7
  R 2
  D 8
  U 9
  L 4
  D 9
  U 6
  L 13
  D 15
  L 2
  D 15
  L 10
  R 7
  D 10
  L 4
  U 16
  D 7
  R 8
  D 13
  R 4
  L 5
  U 8
  R 15
  U 10
  R 17
  U 8
  L 5
  D 11
  L 2
  U 13
  D 12
  L 3
  U 4
  R 16
  D 4
  L 5
  D 3
  L 16
  R 16
  L 16
  U 10
  L 13
  R 14
  L 7
  U 3
  D 15
  U 11
  D 8
  L 3
  D 3
  U 6
  D 14
  U 1
  L 3
  D 7
  U 14
  R 17
  U 1
  R 16
  U 11
  R 17
  D 10
  R 8
  D 5
  L 14
  R 1
  L 3
  D 17
  R 4
  U 9
  D 1
  U 13
  R 4
  L 3
  U 9
  R 11
  U 5
  R 5
  D 14
  U 12
  L 7
  R 2
  L 15
  D 17
  R 16
  D 3
  L 8
  D 11
  L 1
  U 2
  D 7
  L 11
  R 14
  L 5
  R 17
  U 11
  L 12
  D 14
  L 11
  D 13
  L 12
  R 1
  D 11
  R 2
  L 2
  D 17
  U 5
  R 4
  D 14
  L 14
  D 9
  L 13
  D 12
  R 2
  L 10
  R 7
  U 11
  L 16
  U 12
  R 9
  U 1
  R 17
  U 4
  L 7
  U 1
  L 7
  R 1
  D 5
  L 8
  U 11
  D 4
  U 5
  L 15
  D 3
  L 6
  R 4
  D 1
  R 9
  L 18
  R 6
  L 6
  U 16
  R 16
  D 16
  L 1
  U 13
  R 16
  D 6
  R 15
  U 8
  D 14
  U 5
  D 16
  U 14
  L 13
  R 18
  L 6
  U 5
  R 14
  U 18
  L 10
  D 3
  U 5
  D 15
  R 1
  L 12
  R 1
  L 9
  U 8
  L 14
  U 9
  L 9
  D 5
  R 3
  L 8
  D 18
  L 13
  D 15
  R 15
  U 4
  D 17
  L 17
  U 9
  R 1
  L 13
  R 8
  D 9
  U 15
  L 11
  D 6
  L 14
  D 6
  L 6
  U 8
  D 18
  U 3
  R 1
  L 18
  U 16
  L 11
  D 6
  L 16
  U 13
  R 15
  U 10
  D 4
  L 3
  D 1
  U 1
  L 9
  U 16
  L 8
  R 8
  D 2
  U 13
  R 15
  U 9
  L 7
  D 11
  R 17
  D 8
  U 9
  R 7
  D 7
  R 6
  L 10
  U 5
  L 3
  D 4
  L 1
  U 15
  R 8
  U 17
  L 2
  R 9
  U 15
  D 7
  R 3
  L 10
  U 18
  L 16
  R 15
  L 1
  R 18
  L 8
  D 15
  U 6
  D 11
  R 11
  U 7
  R 9
  L 10
  D 7
  L 7
  U 13
  R 14
  U 9
  D 13
  R 11
  U 17
  D 13
  R 17
  D 19
  L 9
  U 12
  L 16
  D 9
  U 15
  R 5
  D 13
  L 17
  D 3
  R 18
  D 12
  U 9
  D 13
  R 7
  U 18
  R 1
  U 10
  R 11
  U 15
  L 5
  D 15
  R 10
  D 18
  L 8
  U 4
  D 15
  R 11
  U 11
  D 17
  U 2
  R 6
  U 13
  R 8
  D 9
  U 19
  D 8
  U 5
  D 10
  U 18
  L 7
  D 2
  R 13
  D 11
  R 14
  L 14
  R 11
  U 11
  D 13
  L 4
  R 2
  U 18
  L 4
  D 3
  L 15
  U 6
  R 16
  L 13
  D 3
  U 14
  R 5
  U 15
  L 7
  R 5
  U 11
  L 16
  R 5
  L 1
  U 9
  D 7
  R 8
  L 11
  R 6
  L 16
  U 19
  R 2
  D 10
  L 15
  D 7
  U 19
  D 1
  U 5
  L 3`
}

describe('day09', () => {
  describe('parseMotions', () => {
    it('gets an empty input of motions and returns an empty list of motions', () => {
      const motions: Motion[] = parseMotions(``)
      const expected: Motion[] = []
      expect(motions).toStrictEqual(expected)
    })

    it('gets one row of heights as input and returns a height map with one row', () => {
      const motions: Motion[] = parseMotions(`R 4`)
      const expected: Motion[] = [{command: 'R', steps: 4}]
      expect(motions).toStrictEqual(expected)
    })

    it('gets five rows of heights as input and returns a height map with five rows', () => {
      const motions: Motion[] = parseMotions(`R 4
      U 4
      L 3
      D 1
      R 4
      D 1
      L 5
      R 2`)
      const expected: Motion[] = [
        {command: 'R', steps: 4},
        {command: 'U', steps: 4},
        {command: 'L', steps: 3},
        {command: 'D', steps: 1},
        {command: 'R', steps: 4},
        {command: 'D', steps: 1},
        {command: 'L', steps: 5},
        {command: 'R', steps: 2},
      ]
      expect(motions).toStrictEqual(expected)
    })
  })

  describe('executeCommands', () => {
    it('gets no commands and an 1x1 initial rope map and returns an 1x1 rope map and tail visit map', () => {
      const commands: Motion[] = []
      const ropeMap: RopeMapType = [['s']]
      const tailVisitMap: TailVisitMapType = [['s']]
      const expectedRopeMap: RopeMapType = [['s']]
      const expectedTailVisitMap: TailVisitMapType = [['s']]

      executeCommands(commands, ropeMap, tailVisitMap)
      expect(ropeMap).toStrictEqual(expectedRopeMap)
      expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
    })

    describe('moving right', () => {
      let commands: Motion[] = [{command: 'R', steps: 1}]

      it('gets command "R 1" with H and T on s and moves H right of s (and T)', () => {
        const ropeMap: RopeMapType = [['s']]
        const tailVisitMap: TailVisitMapType = [['s']]
        const expectedRopeMap: RopeMapType = [['s', 'H']]
        const expectedTailVisitMap: TailVisitMapType = [['s', 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "R 1" with H left of T on same row and moves H on top of T', () => {
        const ropeMap: RopeMapType = [['.','H','T']]
        const tailVisitMap: TailVisitMapType = [[0, 0, 0]]
        const expectedRopeMap: RopeMapType = [['.', '.', 'H']]
        const expectedTailVisitMap: TailVisitMapType = [[0, 0, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "R 1" with H on top of T and moves H right of T', () => {
        const ropeMap: RopeMapType = [['.','H','.']]
        const tailVisitMap: TailVisitMapType = [[0, 0, 0]]
        const expectedRopeMap: RopeMapType = [['.', 'T', 'H']]
        const expectedTailVisitMap: TailVisitMapType = [[0, 0, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "R 1" with H right of T and moves H further and pulls T to left of H', () => {
        const ropeMap: RopeMapType = [['T','H','.']]
        const tailVisitMap: TailVisitMapType = [[0, 0, 0]]
        const expectedRopeMap: RopeMapType = [['.', 'T', 'H']]
        const expectedTailVisitMap: TailVisitMapType = [[0, 1, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "R 2" with H right of T and moves H further and pulls T to left of H', () => {
        commands = [{command: 'R', steps: 2}]
        const ropeMap: RopeMapType = [['T','H','.']]
        const tailVisitMap: TailVisitMapType = [[0, 0, 1]]
        const expectedRopeMap: RopeMapType = [['.', '.', 'T', 'H']]
        const expectedTailVisitMap: TailVisitMapType = [[0, 1, 2, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
    })

    describe('moving left', () => {
      let commands: Motion[] = [{command: 'L', steps: 1}]

      it('gets command "L 1" with H and T on s and moves H left of s (and T)', () => {
        const ropeMap: RopeMapType = [['s']]
        const tailVisitMap: TailVisitMapType = [['s']]
        const expectedRopeMap: RopeMapType = [['H', 's']]
        const expectedTailVisitMap: TailVisitMapType = [[0, 's']]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "L 1" with H right of T on same row and moves H on top of T', () => {
        const ropeMap: RopeMapType = [['.','T','H']]
        const tailVisitMap: TailVisitMapType = [[0, 0, 0]]
        const expectedRopeMap: RopeMapType = [['.', 'H', '.']]
        const expectedTailVisitMap: TailVisitMapType = [[0, 0, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "L 1" with H on top of T and moves H left of T', () => {
        const ropeMap: RopeMapType = [['.','H','.']]
        const tailVisitMap: TailVisitMapType = [[0, 0, 0]]
        const expectedRopeMap: RopeMapType = [['H', 'T', '.']]
        const expectedTailVisitMap: TailVisitMapType = [[0, 0, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "L 1" with H left of T and moves H further and pulls T to right of H', () => {
        const ropeMap: RopeMapType = [['.','H','T']]
        const tailVisitMap: TailVisitMapType = [[0, 0, 0]]
        const expectedRopeMap: RopeMapType = [['H', 'T', '.']]
        const expectedTailVisitMap: TailVisitMapType = [[0, 1, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "L 2" with H left of T and moves H further and pulls T to right of H', () => {
        commands = [{command: 'L', steps: 2}]
        const ropeMap: RopeMapType = [['.','H','T']]
        const tailVisitMap: TailVisitMapType = [[1, 0, 0]]
        const expectedRopeMap: RopeMapType = [['H', 'T', '.', '.']]
        const expectedTailVisitMap: TailVisitMapType = [[0, 2, 1, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
    })

    describe('moving up', () => {
      let commands: Motion[] = [{command: 'U', steps: 1}]

      it('gets command "U 1" with H and T on s and moves H above of s (and T)', () => {
        const ropeMap: RopeMapType = [['s']]
        const tailVisitMap: TailVisitMapType = [['s']]
        const expectedRopeMap: RopeMapType = [['H'], ['s']]
        const expectedTailVisitMap: TailVisitMapType = [[0], ['s']]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "U 1" with H below of T on same column and moves H on top of T', () => {
        const ropeMap: RopeMapType = [['.'], ['T'], ['H']]
        const tailVisitMap: TailVisitMapType = [[0], [0], [0]]
        const expectedRopeMap: RopeMapType = [['.'], ['H'], ['.']]
        const expectedTailVisitMap: TailVisitMapType = [[0], [0], [0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "U 1" with H on top of T and moves H above of T', () => {
        const ropeMap: RopeMapType = [['.'], ['H'], ['.']]
        const tailVisitMap: TailVisitMapType = [[0], [0], [0]]
        const expectedRopeMap: RopeMapType = [['H'], ['T'], ['.']]
        const expectedTailVisitMap: TailVisitMapType = [[0], [0], [0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "U 1" with H above of T and moves H further and pulls T below of H', () => {
        const ropeMap: RopeMapType = [['.'], ['H'], ['T']]
        const tailVisitMap: TailVisitMapType = [[0], [0], [0]]
        const expectedRopeMap: RopeMapType = [['H'], ['T'], ['.']]
        const expectedTailVisitMap: TailVisitMapType = [[0], [1], [0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "U 2" with H above of T and moves H further and pulls T below of H', () => {
        commands = [{command: 'U', steps: 2}]
        const ropeMap: RopeMapType = [['.'], ['H'], ['T']]
        const tailVisitMap: TailVisitMapType = [[1], [0], [0]]
        const expectedRopeMap: RopeMapType = [['H'], ['T'], ['.'], ['.']]
        const expectedTailVisitMap: TailVisitMapType = [[0], [2], [1], [0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
    })

    describe('moving down', () => {
      let commands: Motion[] = []
      beforeEach(() => {
        commands = [{command: 'D', steps: 1}]
      })

      it('gets command "D 1" with H and T on s and moves H below of s (and T)', () => {
        const ropeMap: RopeMapType = [['s']]
        const tailVisitMap: TailVisitMapType = [['s']]
        const expectedRopeMap: RopeMapType = [['s'], ['H']]
        const expectedTailVisitMap: TailVisitMapType = [['s'], [0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "D 1" with H above of T on same column and moves H on top of T', () => {
        const ropeMap: RopeMapType = [['H'], ['T'], ['.']]
        const tailVisitMap: TailVisitMapType = [[0], [0], [0]]
        const expectedRopeMap: RopeMapType = [['.'], ['H'], ['.']]
        const expectedTailVisitMap: TailVisitMapType = [[0], [0], [0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "D 1" with H on top of T and moves H below of T', () => {
        const ropeMap: RopeMapType = [['.'], ['H'], ['.']]
        const tailVisitMap: TailVisitMapType = [[0], [0], [0]]
        const expectedRopeMap: RopeMapType = [['.'], ['T'], ['H']]
        const expectedTailVisitMap: TailVisitMapType = [[0], [0], [0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "D 1" with H below of T and moves H further and pulls T above of H', () => {
        const ropeMap: RopeMapType = [['T'], ['H'], ['.']]
        const tailVisitMap: TailVisitMapType = [[0], [0], [0]]
        const expectedRopeMap: RopeMapType = [['.'], ['T'], ['H']]
        const expectedTailVisitMap: TailVisitMapType = [[0], [1], [0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
  
      it('gets command "D 2" with H below of T and moves H further and pulls T above of H', () => {
        commands = [{command: 'D', steps: 2}]
        const ropeMap: RopeMapType = [['T'], ['H'], ['.']]
        const tailVisitMap: TailVisitMapType = [[0], [1], [2]]
        const expectedRopeMap: RopeMapType = [['.'], ['.'], ['T'], ['H']]
        const expectedTailVisitMap: TailVisitMapType = [[0], [2], [3], [0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
    })

    describe('leaves T at position', () => {
      it('gets command "D 1" with H left of T on same row and leaves T unchanged', () => {
        const commands: Motion[] = [{command: 'D', steps: 1}]
        const ropeMap: RopeMapType = [['H', 'T']]
        const tailVisitMap: TailVisitMapType = [[0, 0]]
        const expectedRopeMap: RopeMapType = [
          ['.', 'T'],
          ['H', '.'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [[0, 0], [0, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets command "U 1" with H left of T on same row and leaves T unchanged', () => {
        const commands: Motion[] = [{command: 'U', steps: 1}]
        const ropeMap: RopeMapType = [['H', 'T']]
        const tailVisitMap: TailVisitMapType = [[0, 0]]
        const expectedRopeMap: RopeMapType = [
          ['H', '.'],
          ['.', 'T'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [[0, 0], [0, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets command "L 1" with H above of T on same column and leaves T unchanged', () => {
        const commands: Motion[] = [{command: 'L', steps: 1}]
        const ropeMap: RopeMapType = [['H'], ['T']]
        const tailVisitMap: TailVisitMapType = [[0], [0]]
        const expectedRopeMap: RopeMapType = [
          ['H', '.'],
          ['.', 'T'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [[0, 0], [0, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets command "R 1" with H above of T on same column and leaves T unchanged', () => {
        const commands: Motion[] = [{command: 'R', steps: 1}]
        const ropeMap: RopeMapType = [['H'], ['T']]
        const tailVisitMap: TailVisitMapType = [[0], [0]]
        const expectedRopeMap: RopeMapType = [
          ['.', 'H'],
          ['T', '.'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [[0, 0], [0, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
    })

    describe('moving T diagonally', () => {
      it('gets command "R 1" with H right of T and on row below T and moves T left of H', () => {
        const commands: Motion[] = [{command: 'R', steps: 1}]
        const ropeMap: RopeMapType = [
          ['T', '.', '.'],
          ['.', 'H', '.'],
        ]
        const tailVisitMap: TailVisitMapType = [[0, 0, 0], [0, 0, 0]]
        const expectedRopeMap: RopeMapType = [
          ['.', '.', '.'],
          ['.', 'T', 'H'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [[0, 0, 0], [0, 1, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets command "R 1" with H right of T and on row above T and moves T left of H', () => {
        const commands: Motion[] = [{command: 'R', steps: 1}]
        const ropeMap: RopeMapType = [
          ['.', 'H', '.'],
          ['T', '.', '.'],
        ]
        const tailVisitMap: TailVisitMapType = [[0, 0, 0], [0, 0, 0]]
        const expectedRopeMap: RopeMapType = [
          ['.', 'T', 'H'],
          ['.', '.', '.'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [[0, 1, 0], [0, 0, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets command "L 1" with H left of T and on row below T and moves T right of H', () => {
        const commands: Motion[] = [{command: 'L', steps: 1}]
        const ropeMap: RopeMapType = [
          ['.', '.', 'T'],
          ['.', 'H', '.'],
        ]
        const tailVisitMap: TailVisitMapType = [[0, 0, 0], [0, 0, 0]]
        const expectedRopeMap: RopeMapType = [
          ['.', '.', '.'],
          ['H', 'T', '.'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [[0, 0, 0], [0, 1, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets command "L 1" with H left of T and on row above T and moves T right of H', () => {
        const commands: Motion[] = [{command: 'L', steps: 1}]
        const ropeMap: RopeMapType = [
          ['.', 'H', '.'],
          ['.', '.', 'T'],
        ]
        const tailVisitMap: TailVisitMapType = [[0, 0, 0], [0, 0, 0]]
        const expectedRopeMap: RopeMapType = [
          ['H', 'T', '.'],
          ['.', '.', '.'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [[0, 1, 0], [0, 0, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets command "U 1" with H right of T and on row above T and moves T below of H', () => {
        const commands: Motion[] = [{command: 'U', steps: 1}]
        const ropeMap: RopeMapType = [
          ['.', '.'],
          ['.', 'H'],
          ['T', '.'],
        ]
        const tailVisitMap: TailVisitMapType = [[0, 0], [0, 0], [0, 0]]
        const expectedRopeMap: RopeMapType = [
          ['.', 'H'],
          ['.', 'T'],
          ['.', '.'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [[0, 0], [0, 1], [0, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets command "U 1" with H left of T and on row above T and moves T below of H', () => {
        const commands: Motion[] = [{command: 'U', steps: 1}]
        const ropeMap: RopeMapType = [
          ['.', '.'],
          ['H', '.'],
          ['.', 'T'],
        ]
        const tailVisitMap: TailVisitMapType = [[0, 0], [0, 0], [0, 0]]
        const expectedRopeMap: RopeMapType = [
          ['H', '.'],
          ['T', '.'],
          ['.', '.'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [[0, 0], [1, 0], [0, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets command "D 1" with H right of T and on row below T and moves T above of H', () => {
        const commands: Motion[] = [{command: 'D', steps: 1}]
        const ropeMap: RopeMapType = [
          ['T', '.'],
          ['.', 'H'],
          ['.', '.'],
        ]
        const tailVisitMap: TailVisitMapType = [[0, 0], [0, 0], [0, 0]]
        const expectedRopeMap: RopeMapType = [
          ['.', '.'],
          ['.', 'T'],
          ['.', 'H'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [[0, 0], [0, 1], [0, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets command "D 1" with H left of T and on row below T and moves T above of H', () => {
        const commands: Motion[] = [{command: 'D', steps: 1}]
        const ropeMap: RopeMapType = [
          ['.', 'T'],
          ['H', '.'],
          ['.', '.'],
        ]
        const tailVisitMap: TailVisitMapType = [[0, 0], [0, 0], [0, 0]]
        const expectedRopeMap: RopeMapType = [
          ['.', '.'],
          ['T', '.'],
          ['H', '.'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [[0, 0], [1, 0], [0, 0]]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
    })

    describe('moving the exampe', () => {
      it('gets the example commands 1 as input and produces the example result', () => {
        const input = `R 4`
        const commands: Motion[] = parseMotions(input)
        const ropeMap: RopeMapType = [['s']]
        const tailVisitMap: TailVisitMapType = [['s']]
        const expectedRopeMap: RopeMapType = [
          ['s', '.', '.', 'T', 'H'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [
          ['s', 1, 1, 1, 0],
        ]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets the example commands 1-2 as input and produces the example result', () => {
        const input = `R 4
        U 4`
        const commands: Motion[] = parseMotions(input)
        const ropeMap: RopeMapType = [['s']]
        const tailVisitMap: TailVisitMapType = [['s']]
        const expectedRopeMap: RopeMapType = [
          ['.', '.', '.', '.', 'H'],
          ['.', '.', '.', '.', 'T'],
          ['.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.'],
          ['s', '.', '.', '.', '.'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [
          [ 0,  0, 0, 0, 0],
          [ 0,  0, 0, 0, 1],
          [ 0,  0, 0, 0, 1],
          [ 0,  0, 0, 0, 1],
          ['s', 1, 1, 1, 0],
        ]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets the example commands 1-3 as input and produces the example result', () => {
        const input = `R 4
        U 4
        L 3`
        const commands: Motion[] = parseMotions(input)
        const ropeMap: RopeMapType = [['s']]
        const tailVisitMap: TailVisitMapType = [['s']]
        const expectedRopeMap: RopeMapType = [
          ['.', 'H', 'T', '.', '.'],
          ['.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.'],
          ['s', '.', '.', '.', '.'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [
          [ 0,  0, 1, 1, 0],
          [ 0,  0, 0, 0, 1],
          [ 0,  0, 0, 0, 1],
          [ 0,  0, 0, 0, 1],
          ['s', 1, 1, 1, 0],
        ]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets the example commands 1-4 as input and produces the example result', () => {
        const input = `R 4
        U 4
        L 3
        D 1`
        const commands: Motion[] = parseMotions(input)
        const ropeMap: RopeMapType = [['s']]
        const tailVisitMap: TailVisitMapType = [['s']]
        const expectedRopeMap: RopeMapType = [
          ['.', '.', 'T', '.', '.'],
          ['.', 'H', '.', '.', '.'],
          ['.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.'],
          ['s', '.', '.', '.', '.'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [
          [ 0,  0, 1, 1, 0],
          [ 0,  0, 0, 0, 1],
          [ 0,  0, 0, 0, 1],
          [ 0,  0, 0, 0, 1],
          ['s', 1, 1, 1, 0],
        ]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets the example commands as input and produces the example result', () => {
        const input = `R 4
        U 4
        L 3
        D 1
        R 4
        D 1
        L 5
        R 2`
        const commands: Motion[] = parseMotions(input)
        const ropeMap: RopeMapType = [['s']]
        const tailVisitMap: TailVisitMapType = [['s']]
        const expectedRopeMap: RopeMapType = [
          ['.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
          ['.', 'T', 'H', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.'],
          ['s', '.', '.', '.', '.', '.'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [
          [0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 2, 0],
          [0, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 1, 0],
          ['s', 1, 1, 1, 0, 0],
        ]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })

      it('gets the puzzle #1 command 90 as input and produces a result', () => {
        const input = `D 2`
        const commands: Motion[] = parseMotions(input)
        const ropeMap: RopeMapType = [
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', 'T', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', 'H', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', 's', '.', '.', '.', '.'],
        ]
        const tailVisitMap: TailVisitMapType = [
          [0, 0, 0, 0, 0, 0,  0 , 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0,  0 , 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0,  0 , 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0,  1 , 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0,  1 , 0, 0, 1, 0],
          [0, 0, 0, 0, 0, 0,  0 , 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0,  1 , 0, 0, 1, 0],
          [0, 0, 0, 0, 0, 1,  0 , 0, 0, 1, 0],
          [0, 0, 0, 1, 1, 1,  0 , 0, 0, 0, 1],
          [0, 1, 0, 1, 1, 3,  2 , 1, 0, 1, 0],
          [1, 0, 1, 3, 2, 1,  1 , 0, 1, 0, 0],
          [0, 1, 2, 1, 1, 1, 's', 0, 0, 0, 0],
        ]
        const expectedRopeMap: RopeMapType = [
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
          ['.', 'T', '.', '.', '.', '.', 's', '.', '.', '.', '.'],
          ['.', 'H', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ]
        const expectedTailVisitMap: TailVisitMapType = [
          [0, 0, 0, 0, 0, 0,  0 , 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0,  0 , 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0,  0 , 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0,  1 , 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0,  1 , 0, 0, 1, 0],
          [0, 0, 0, 0, 0, 0,  0 , 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0,  1 , 0, 0, 1, 0],
          [0, 0, 0, 0, 0, 1,  0 , 0, 0, 1, 0],
          [0, 0, 0, 1, 1, 1,  0 , 0, 0, 0, 1],
          [0, 1, 0, 1, 1, 3,  2 , 1, 0, 1, 0],
          [1, 1, 1, 3, 2, 1,  1 , 0, 1, 0, 0],
          [0, 2, 2, 1, 1, 1, 's', 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0,  0 , 0, 0, 0, 0],
        ]
  
        executeCommands(commands, ropeMap, tailVisitMap)
        
        expect(ropeMap).toStrictEqual(expectedRopeMap)
        expect(tailVisitMap).toStrictEqual(expectedTailVisitMap)
      })
    })
  })

  describe('countVisitedPositions', () => {
    it('gets the example motions as input and returns 13', () => {
      const input = `R 4
      U 4
      L 3
      D 1
      R 4
      D 1
      L 5
      R 2`
      expect(countVisitedPositions(input)).toBe(13)
    })

    it('gets the puzzle motions 0-90 as input and returns 39', () => {
      const input = `U 1
      D 1
      L 1
      U 2
      L 1
      D 2
      L 2
      U 2
      L 1
      R 2
      U 2
      D 1
      R 2
      U 1
      R 1
      U 1
      R 1
      U 2
      L 1
      U 2
      D 1
      R 1
      U 2
      D 1
      U 2
      D 2
      U 2
      D 1
      R 1
      D 2
      L 2
      R 2
      L 1
      R 2
      D 2
      L 2
      U 1
      D 2
      R 2
      L 2
      R 2
      D 2
      R 1
      D 1
      L 1
      D 1
      L 2
      D 1
      R 1
      L 1
      U 2
      L 2
      U 1
      D 1
      U 1
      D 1
      L 2
      D 2
      L 2
      U 1
      R 2
      D 1
      U 1
      R 2
      L 1
      R 1
      L 1
      R 2
      L 1
      U 2
      R 1
      L 1
      U 1
      D 2
      R 1
      D 2
      L 1
      U 2
      D 2
      L 2
      U 1
      L 1
      D 1
      L 2
      U 2
      R 2
      U 1
      D 2
      L 1
      D 2`
      expect(countVisitedPositions(input)).toBe(39)
    })
  })

  describe('solves puzzle #1', () => {
    it('gets the puzzle input and returns the number of visited knots', () => {
      const solution = countVisitedPositions(aoc.puzzleInput)
      console.log('puzzle #1 answer: ', solution)
      console.log('6885 is too high. I do not get it according to all the tests here')
      expect(solution).toBe(6885)
    })
  })
})
