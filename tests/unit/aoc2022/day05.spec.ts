import {describe, it, expect} from 'vitest'

import {
  StackType,
  createStackType,
  StartingStacksType,
  createStartingStacksType,
  createRearrangementType,
  RearrangementProcedureType,
  createRearrangementProcedureType,
  CraneOperationType,
  parseCraneOperationType,
  rearrangeStacks,
  collectTopCratesAfterCraneOperations,
} from '@/aoc2022/day05'

const aoc = {
  puzzleInput:
`[M]                     [N] [Z]    
[F]             [R] [Z] [C] [C]    
[C]     [V]     [L] [N] [G] [V]    
[W]     [L]     [T] [H] [V] [F] [H]
[T]     [T] [W] [F] [B] [P] [J] [L]
[D] [L] [H] [J] [C] [G] [S] [R] [M]
[L] [B] [C] [P] [S] [D] [M] [Q] [P]
[B] [N] [J] [S] [Z] [W] [F] [W] [R]
 1   2   3   4   5   6   7   8   9 

move 5 from 3 to 6
move 2 from 2 to 5
move 1 from 9 to 1
move 1 from 3 to 1
move 5 from 7 to 5
move 2 from 9 to 8
move 1 from 2 to 8
move 1 from 4 to 2
move 8 from 1 to 6
move 4 from 6 to 9
move 1 from 2 to 1
move 2 from 4 to 8
move 2 from 8 to 4
move 3 from 7 to 5
move 6 from 5 to 3
move 1 from 1 to 8
move 1 from 5 to 7
move 5 from 6 to 9
move 3 from 5 to 8
move 2 from 4 to 3
move 1 from 7 to 8
move 2 from 8 to 6
move 2 from 1 to 8
move 8 from 3 to 8
move 11 from 6 to 3
move 1 from 4 to 7
move 1 from 3 to 7
move 2 from 6 to 1
move 7 from 9 to 7
move 10 from 3 to 5
move 1 from 9 to 3
move 2 from 9 to 5
move 5 from 5 to 2
move 19 from 8 to 6
move 1 from 9 to 6
move 1 from 3 to 8
move 4 from 2 to 6
move 1 from 1 to 4
move 5 from 8 to 9
move 1 from 2 to 1
move 6 from 7 to 2
move 3 from 5 to 8
move 3 from 8 to 1
move 2 from 9 to 6
move 1 from 7 to 8
move 6 from 2 to 7
move 1 from 4 to 8
move 3 from 8 to 4
move 2 from 1 to 5
move 7 from 7 to 6
move 1 from 7 to 2
move 3 from 4 to 6
move 2 from 9 to 2
move 1 from 1 to 8
move 2 from 1 to 3
move 1 from 8 to 7
move 3 from 2 to 5
move 5 from 5 to 8
move 4 from 5 to 3
move 1 from 7 to 8
move 2 from 8 to 1
move 1 from 8 to 5
move 5 from 3 to 5
move 13 from 5 to 1
move 1 from 3 to 4
move 2 from 8 to 3
move 3 from 1 to 4
move 1 from 3 to 1
move 1 from 8 to 1
move 5 from 1 to 9
move 1 from 3 to 7
move 2 from 9 to 6
move 2 from 1 to 7
move 3 from 1 to 5
move 3 from 1 to 5
move 1 from 6 to 1
move 4 from 4 to 3
move 3 from 9 to 1
move 5 from 1 to 7
move 7 from 7 to 8
move 1 from 3 to 9
move 28 from 6 to 8
move 5 from 5 to 9
move 6 from 6 to 1
move 4 from 1 to 8
move 5 from 9 to 1
move 12 from 8 to 7
move 1 from 3 to 8
move 6 from 1 to 4
move 5 from 4 to 1
move 3 from 6 to 4
move 2 from 3 to 4
move 3 from 1 to 5
move 6 from 7 to 1
move 2 from 4 to 9
move 2 from 5 to 4
move 19 from 8 to 1
move 4 from 9 to 5
move 5 from 4 to 3
move 4 from 1 to 4
move 5 from 5 to 1
move 3 from 8 to 5
move 7 from 7 to 3
move 14 from 1 to 8
move 5 from 4 to 2
move 12 from 8 to 7
move 1 from 3 to 6
move 3 from 5 to 9
move 1 from 7 to 8
move 8 from 1 to 2
move 5 from 1 to 2
move 9 from 3 to 4
move 8 from 4 to 6
move 2 from 1 to 9
move 3 from 6 to 1
move 5 from 6 to 7
move 14 from 7 to 1
move 1 from 4 to 7
move 6 from 8 to 2
move 14 from 1 to 4
move 13 from 4 to 9
move 2 from 3 to 5
move 3 from 1 to 7
move 1 from 8 to 4
move 1 from 4 to 1
move 1 from 1 to 3
move 1 from 3 to 4
move 1 from 4 to 1
move 1 from 6 to 9
move 1 from 7 to 6
move 1 from 4 to 5
move 11 from 9 to 3
move 6 from 3 to 8
move 5 from 3 to 1
move 2 from 8 to 4
move 1 from 6 to 2
move 7 from 9 to 2
move 1 from 7 to 2
move 1 from 9 to 8
move 2 from 8 to 6
move 30 from 2 to 3
move 2 from 7 to 2
move 2 from 8 to 2
move 3 from 8 to 7
move 6 from 2 to 5
move 1 from 2 to 5
move 3 from 1 to 8
move 2 from 6 to 7
move 1 from 1 to 9
move 1 from 9 to 3
move 7 from 3 to 1
move 6 from 7 to 8
move 8 from 3 to 9
move 7 from 9 to 1
move 1 from 5 to 8
move 7 from 5 to 9
move 2 from 4 to 2
move 11 from 3 to 6
move 2 from 2 to 7
move 11 from 1 to 8
move 2 from 5 to 4
move 11 from 6 to 4
move 12 from 4 to 9
move 4 from 1 to 5
move 3 from 7 to 9
move 12 from 8 to 4
move 1 from 1 to 7
move 6 from 8 to 3
move 2 from 3 to 5
move 3 from 8 to 4
move 3 from 3 to 7
move 9 from 9 to 7
move 5 from 3 to 9
move 1 from 3 to 2
move 13 from 7 to 5
move 1 from 2 to 6
move 1 from 6 to 1
move 1 from 1 to 6
move 16 from 4 to 5
move 1 from 5 to 6
move 16 from 5 to 4
move 13 from 4 to 5
move 3 from 4 to 2
move 1 from 6 to 7
move 3 from 2 to 1
move 8 from 5 to 2
move 3 from 1 to 4
move 1 from 7 to 9
move 14 from 5 to 1
move 10 from 1 to 5
move 1 from 2 to 8
move 19 from 9 to 1
move 1 from 9 to 1
move 6 from 2 to 7
move 4 from 1 to 7
move 1 from 8 to 6
move 16 from 5 to 3
move 1 from 5 to 4
move 2 from 5 to 2
move 1 from 5 to 6
move 1 from 6 to 5
move 1 from 2 to 4
move 7 from 7 to 2
move 4 from 4 to 7
move 2 from 6 to 2
move 8 from 2 to 9
move 4 from 9 to 2
move 16 from 3 to 7
move 4 from 9 to 7
move 14 from 1 to 3
move 26 from 7 to 8
move 1 from 5 to 4
move 20 from 8 to 4
move 5 from 1 to 8
move 2 from 4 to 6
move 4 from 3 to 2
move 1 from 6 to 5
move 8 from 2 to 4
move 1 from 6 to 5
move 1 from 7 to 8
move 8 from 3 to 1
move 6 from 1 to 9
move 1 from 3 to 6
move 14 from 4 to 1
move 1 from 3 to 8
move 2 from 2 to 1
move 1 from 6 to 8
move 1 from 2 to 8
move 5 from 8 to 1
move 2 from 1 to 6
move 2 from 5 to 9
move 1 from 6 to 3
move 1 from 6 to 1
move 5 from 9 to 2
move 5 from 4 to 1
move 5 from 4 to 2
move 16 from 1 to 8
move 9 from 1 to 4
move 24 from 8 to 6
move 1 from 8 to 7
move 7 from 6 to 5
move 1 from 3 to 4
move 3 from 1 to 8
move 3 from 5 to 8
move 10 from 4 to 8
move 3 from 4 to 6
move 1 from 7 to 4
move 20 from 6 to 7
move 1 from 4 to 9
move 1 from 4 to 9
move 7 from 2 to 3
move 13 from 8 to 9
move 4 from 5 to 9
move 4 from 8 to 5
move 18 from 9 to 2
move 14 from 7 to 5
move 6 from 3 to 8
move 1 from 3 to 2
move 1 from 8 to 6
move 4 from 8 to 2
move 1 from 2 to 3
move 17 from 5 to 3
move 18 from 3 to 5
move 6 from 7 to 2
move 3 from 9 to 7
move 1 from 8 to 6
move 5 from 2 to 5
move 26 from 2 to 7
move 1 from 6 to 9
move 29 from 7 to 9
move 15 from 5 to 2
move 1 from 6 to 7
move 8 from 9 to 2
move 14 from 2 to 6
move 16 from 9 to 1
move 6 from 9 to 1
move 1 from 7 to 1
move 3 from 2 to 1
move 5 from 2 to 6
move 15 from 1 to 4
move 1 from 2 to 8
move 1 from 9 to 7
move 1 from 8 to 6
move 19 from 6 to 7
move 10 from 1 to 8
move 4 from 8 to 3
move 1 from 7 to 5
move 3 from 5 to 3
move 13 from 7 to 6
move 2 from 8 to 9
move 7 from 3 to 6
move 5 from 5 to 3
move 1 from 1 to 6
move 2 from 5 to 1
move 4 from 4 to 8
move 7 from 8 to 7
move 8 from 7 to 3
move 1 from 8 to 4
move 2 from 9 to 2
move 8 from 6 to 5
move 1 from 4 to 5
move 4 from 5 to 4
move 2 from 2 to 8
move 9 from 4 to 5
move 2 from 1 to 9
move 2 from 8 to 9
move 14 from 6 to 4
move 5 from 3 to 4
move 3 from 9 to 7
move 3 from 5 to 3
move 2 from 4 to 8
move 2 from 4 to 7
move 2 from 8 to 9
move 4 from 5 to 8
move 16 from 4 to 6
move 1 from 9 to 6
move 3 from 7 to 5
move 7 from 7 to 5
move 10 from 5 to 1
move 6 from 3 to 8
move 2 from 9 to 3
move 3 from 6 to 9
move 3 from 3 to 6
move 2 from 1 to 7
move 13 from 6 to 2
move 2 from 4 to 5
move 2 from 7 to 6
move 2 from 6 to 7
move 2 from 4 to 1
move 3 from 9 to 5
move 1 from 1 to 4
move 3 from 2 to 5
move 2 from 4 to 1
move 2 from 3 to 2
move 5 from 8 to 5
move 1 from 7 to 2
move 1 from 7 to 1
move 1 from 3 to 5
move 1 from 8 to 7
move 1 from 6 to 7
move 1 from 3 to 5
move 12 from 5 to 6
move 6 from 6 to 2
move 1 from 7 to 4
move 1 from 5 to 7
move 2 from 8 to 9
move 1 from 9 to 6
move 1 from 8 to 9
move 5 from 6 to 9
move 1 from 8 to 1
move 14 from 2 to 4
move 1 from 7 to 1
move 1 from 7 to 2
move 3 from 2 to 3
move 2 from 3 to 4
move 1 from 2 to 4
move 4 from 6 to 2
move 8 from 5 to 8
move 15 from 4 to 8
move 3 from 4 to 8
move 7 from 8 to 4
move 6 from 1 to 3
move 1 from 6 to 1
move 5 from 4 to 8
move 7 from 9 to 1
move 1 from 5 to 6
move 4 from 2 to 6
move 10 from 1 to 8
move 29 from 8 to 3
move 1 from 4 to 5
move 1 from 4 to 6
move 6 from 1 to 4
move 1 from 5 to 8
move 3 from 4 to 2
move 27 from 3 to 7
move 18 from 7 to 9
move 5 from 6 to 3
move 7 from 7 to 4
move 1 from 7 to 8
move 9 from 3 to 5
move 5 from 3 to 6
move 3 from 4 to 2
move 1 from 7 to 2
move 2 from 8 to 4
move 2 from 8 to 6
move 2 from 8 to 6
move 8 from 2 to 1
move 7 from 5 to 4
move 1 from 8 to 9
move 4 from 1 to 5
move 1 from 2 to 9
move 8 from 6 to 3
move 3 from 1 to 8
move 1 from 1 to 7
move 8 from 3 to 6
move 2 from 8 to 3
move 1 from 3 to 6
move 4 from 6 to 7
move 16 from 4 to 2
move 1 from 3 to 5
move 2 from 6 to 4
move 1 from 2 to 3
move 2 from 7 to 3
move 2 from 7 to 8
move 3 from 6 to 7
move 4 from 5 to 2
move 2 from 4 to 2
move 4 from 9 to 8
move 3 from 5 to 1
move 3 from 1 to 6
move 6 from 9 to 1
move 4 from 7 to 9
move 8 from 9 to 5
move 4 from 5 to 2
move 7 from 8 to 6
move 11 from 6 to 8
move 4 from 1 to 2
move 3 from 8 to 9
move 5 from 8 to 7
move 2 from 1 to 6
move 4 from 5 to 6
move 2 from 7 to 9
move 2 from 7 to 3
move 5 from 6 to 2
move 4 from 3 to 1
move 1 from 7 to 2
move 1 from 3 to 2
move 2 from 6 to 7
move 1 from 1 to 6
move 6 from 9 to 6
move 1 from 7 to 6
move 1 from 7 to 6
move 2 from 1 to 7
move 2 from 8 to 6
move 4 from 9 to 2
move 17 from 2 to 6
move 1 from 9 to 4
move 1 from 1 to 3
move 1 from 4 to 1
move 20 from 2 to 8
move 2 from 7 to 6
move 2 from 2 to 5
move 1 from 3 to 1
move 1 from 2 to 5
move 6 from 8 to 6
move 2 from 5 to 6
move 3 from 6 to 4
move 1 from 1 to 4
move 15 from 8 to 2
move 11 from 2 to 9
move 1 from 1 to 3
move 10 from 9 to 4
move 1 from 9 to 8
move 12 from 6 to 3
move 1 from 8 to 7
move 1 from 5 to 4
move 8 from 4 to 7
move 5 from 3 to 4
move 7 from 6 to 4
move 3 from 3 to 6
move 3 from 3 to 2
move 1 from 3 to 6
move 17 from 4 to 3
move 1 from 3 to 4
move 2 from 4 to 9
move 14 from 3 to 6
move 2 from 2 to 7
move 1 from 4 to 9
move 8 from 7 to 6
move 1 from 3 to 4
move 9 from 6 to 2
move 1 from 4 to 2
move 26 from 6 to 2
move 27 from 2 to 6
move 10 from 2 to 4
move 1 from 7 to 6
move 28 from 6 to 2
move 21 from 2 to 4
move 2 from 6 to 7
move 3 from 2 to 1
move 5 from 6 to 5
move 3 from 5 to 2
move 1 from 7 to 4
move 11 from 2 to 4
move 21 from 4 to 9
move 1 from 5 to 8
move 1 from 8 to 6
move 18 from 9 to 7
move 1 from 5 to 7
move 3 from 9 to 8
move 1 from 6 to 7
move 1 from 3 to 5
move 1 from 8 to 3
move 22 from 7 to 5
move 13 from 5 to 1
move 16 from 4 to 5
move 3 from 1 to 4
move 2 from 3 to 9
move 3 from 9 to 7
move 6 from 4 to 6
move 1 from 4 to 2
move 2 from 7 to 3`
}

describe('day05', () => {
  describe('createStackType', () => {
    it('gets an empty stack chunk and returns an empty stack', () => {
      const result: StackType = createStackType('')
      expect(result).toStrictEqual({crates: []})
    })

    it('gets a stack chunk with no crates and returns an empty stack', () => {
      expect(createStackType(' 1 ')).toStrictEqual({crates: []})
      expect(createStackType(' 1 |')).toStrictEqual({crates: []})
    })

    it('gets a stack chunk with one crate and returns the stack with one crate', () => {
      const result: StackType = createStackType(' 1 |[A]')
      expect(result).toStrictEqual({crates: ['[A]']})
    })

    it('gets a stack chunk with three crates and returns the stack with three crates', () => {
      const result: StackType = createStackType(' 1 |[A]|[B]|[C]')
      expect(result).toStrictEqual({crates: ['[A]','[B]','[C]']})
    })

    it('gets a stack chunk with three three slots and an empty slot at the end and returns the stack with trimmed empty slots', () => {
      const result: StackType = createStackType(' 1 |[A]|[B]|   ')
      expect(result).toStrictEqual({crates: ['[A]','[B]']})
    })
  })

  describe('createStartingStacksType', () => {
    it('gets an empty starting stack chunk and returns an empty starting stack', () => {
      const result: StartingStacksType = createStartingStacksType(``)
      expect(result).toStrictEqual({stacks: []})
    })

    it('gets a starting stack chunk with a stack without crates and returns an empty starting stack', () => {
      expect(createStartingStacksType(` 1 `)).toStrictEqual({stacks: [{crates: []}]})
    })

    it('gets a starting stack chunk with one crate and returns the starting stack with one stack', () => {
      const result: StartingStacksType = createStartingStacksType(
`  
[N]
[Z]
 1`)
      expect(result).toStrictEqual({stacks: [{crates: ['[Z]', '[N]']}]})
    })

    it('gets a starting stack chunk with three stacks and returns the starting stack with three stacks', () => {
      const result: StartingStacksType = createStartingStacksType(
`    [D]    
[N] [C]    
[Z] [M] [P]
  1   2   3`)
      expect(result).toStrictEqual({stacks: [
        {crates: ['[Z]', '[N]']},
        {crates: ['[M]', '[C]', '[D]']},
        {crates: ['[P]']},
      ]})
    })

    it('gets a starting stack chunk with nine stacks and returns the starting stack with nine stacks', () => {
      const result: StartingStacksType = createStartingStacksType(
`[M]                     [N] [Z]    
[F]             [R] [Z] [C] [C]    
[C]     [V]     [L] [N] [G] [V]    
[W]     [L]     [T] [H] [V] [F] [H]
[T]     [T] [W] [F] [B] [P] [J] [L]
[D] [L] [H] [J] [C] [G] [S] [R] [M]
[L] [B] [C] [P] [S] [D] [M] [Q] [P]
[B] [N] [J] [S] [Z] [W] [F] [W] [R]
 1   2   3   4   5   6   7   8   9 `)
      expect(result).toStrictEqual({stacks: [
        {crates: ['[B]', '[L]', '[D]', '[T]', '[W]', '[C]', '[F]', '[M]']},
        {crates: ['[N]', '[B]', '[L]']},
        {crates: ['[J]', '[C]', '[H]', '[T]', '[L]', '[V]']},
        {crates: ['[S]', '[P]', '[J]', '[W]']},
        {crates: ['[Z]', '[S]', '[C]', '[F]', '[T]', '[L]', '[R]']},
        {crates: ['[W]', '[D]', '[G]', '[B]', '[H]', '[N]', '[Z]']},
        {crates: ['[F]', '[M]', '[S]', '[P]', '[V]', '[G]', '[C]', '[N]']},
        {crates: ['[W]', '[Q]', '[R]', '[J]', '[F]', '[V]', '[C]', '[Z]']},
        {crates: ['[R]', '[P]', '[M]', '[L]', '[H]']},
      ]})
    })
  })

  describe('createRearrangementType', () => {
    it('gets an empty rearrangement chunk and returns no rearrangement', () => {
      expect(createRearrangementType(``)).toBe(null)
    })

    it('gets a rearrangement chunk and returns the rearrangement', () => {
      expect(createRearrangementType(`move 1 from 2 to 1`)).toStrictEqual({
        quantity: 1,
        fromStackId: 2,
        toStackId: 1,
      })
    })
  })

  describe('createRearrangementProcedureType', () => {
    it('gets an empty rearrangement procedure chunk and returns no rearrangement procedure', () => {
      expect(createRearrangementProcedureType(``)).toStrictEqual({rearrangementProcedures:[]})
    })

    it('gets a rearrangement procedure chunk and returns one rearrangement procedure', () => {
      const input = `move 1 from 2 to 1`
      const result: RearrangementProcedureType  = createRearrangementProcedureType(input)
      const expected = {
        rearrangementProcedures: [
          {quantity: 1, fromStackId: 2, toStackId: 1},
        ]
      }
      expect(result).toStrictEqual(expected)
    })

    it('gets a rearrangement procedure chunk with 4 prceedures and returns four rearrangement procedures', () => {
      const input =
`move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`
      const result: RearrangementProcedureType  = createRearrangementProcedureType(input)
      const expected = {
        rearrangementProcedures: [
          {quantity: 1, fromStackId: 2, toStackId: 1},
          {quantity: 3, fromStackId: 1, toStackId: 3},
          {quantity: 2, fromStackId: 2, toStackId: 1},
          {quantity: 1, fromStackId: 1, toStackId: 2},
        ]
      }
      expect(result).toStrictEqual(expected)
    })
  })

  describe('parseCraneOperationType', () => {
    it('gets an empty crane operations input chunk and returns no crane operations', () => {
      expect(parseCraneOperationType(``)).toStrictEqual({stacks: [], rearrangementProcedures:[]})
    })

    it('gets a crane operations chunk with three stacks and four rearrangements and returns one crane operations with three stacks and four rearrangements', () => {
      const input =
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`
      const result: CraneOperationType  = parseCraneOperationType(input)
      const expected: CraneOperationType = {
        stacks: [
          {crates: ['[Z]', '[N]']},
          {crates: ['[M]', '[C]', '[D]']},
          {crates: ['[P]']},
        ],
        rearrangementProcedures: [
          {quantity: 1, fromStackId: 2, toStackId: 1},
          {quantity: 3, fromStackId: 1, toStackId: 3},
          {quantity: 2, fromStackId: 2, toStackId: 1},
          {quantity: 1, fromStackId: 1, toStackId: 2},
        ]
      }
      expect(result).toStrictEqual(expected)
    })
  })

  describe('rearrangeStacks', () => {
    it('gets an empty crane operations input and returns empty stacks', () => {
      const input: CraneOperationType = {
        stacks: [],
        rearrangementProcedures: []
      }
      const result: StackType[] = rearrangeStacks(input)
      const expected: StackType[] = []
      expect(result).toStrictEqual(expected)
    })

    it('gets a crane operations input without rearrangement procedures and returns the initial stacks', () => {
      const input: CraneOperationType = {
        stacks: [
          {crates: ['[Z]', '[N]']},
          {crates: ['[M]', '[C]', '[D]']},
          {crates: ['[P]']},
        ],
        rearrangementProcedures: []
      }
      const result: StackType[] = rearrangeStacks(input)
      const expected: StackType[] = [
        {crates: ['[Z]', '[N]']},
        {crates: ['[M]', '[C]', '[D]']},
        {crates: ['[P]']},
      ]
      expect(result).toStrictEqual(expected)
    })

    it('gets a crane operations input without initial stacks and throws error', () => {
      const input: CraneOperationType = {
        stacks: [],
        rearrangementProcedures: [
          {quantity: 1, fromStackId: 2, toStackId: 1},
          {quantity: 3, fromStackId: 1, toStackId: 3},
          {quantity: 2, fromStackId: 2, toStackId: 1},
          {quantity: 1, fromStackId: 1, toStackId: 2},
        ]
      }
      let errorMessage: string|null = null
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      vi.spyOn(console, 'error').mockImplementationOnce(() => {})
      try {
        rearrangeStacks(input)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorMessage = error?.message
      }
      expect(errorMessage).toBe("rearrangement procedure 'move 1 from 2 to 1' uses unknown stack! Highest allowed step id is: 0")
    })

    it('gets a crane operations input with invalid stack index and throws error', () => {
      const input: CraneOperationType = {
        stacks: [
          {crates: ['[Z]', '[N]']},
          {crates: ['[M]', '[C]']},
        ],
        rearrangementProcedures: [
          {quantity: 1, fromStackId: 2, toStackId: 1},
          {quantity: 3, fromStackId: 1, toStackId: 3}, // there's no stack 3
        ]
      }
      let errorMessage: string|null = null
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      vi.spyOn(console, 'error').mockImplementationOnce(() => {})
      try {
        rearrangeStacks(input)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorMessage = error?.message
      }
      expect(errorMessage).toBe("rearrangement procedure 'move 3 from 1 to 3' uses unknown stack! Highest allowed step id is: 2")
    })

    it('gets a crane operations input with one rearrangement procedure and returns the modifed stacks', () => {
      const input: CraneOperationType = {
        stacks: [
          {crates: ['[Z]', '[N]']},
          {crates: ['[M]', '[C]', '[D]']},
          {crates: ['[P]']},
        ],
        rearrangementProcedures: [
          {quantity: 1, fromStackId: 2, toStackId: 1},
        ]
      }
      const result: StackType[] = rearrangeStacks(input)
      const expected: StackType[] = [
        {crates: ['[Z]', '[N]', '[D]']},
        {crates: ['[M]', '[C]']},
        {crates: ['[P]']},
      ]
      expect(result).toStrictEqual(expected)
    })

    it('gets a crane operations input with four rearrangement procedures and returns the modifed stacks', () => {
      const input: CraneOperationType = {
        stacks: [
          {crates: ['[Z]', '[N]']},
          {crates: ['[M]', '[C]', '[D]']},
          {crates: ['[P]']},
        ],
        rearrangementProcedures: [
          {quantity: 1, fromStackId: 2, toStackId: 1},
          {quantity: 3, fromStackId: 1, toStackId: 3},
          {quantity: 2, fromStackId: 2, toStackId: 1},
          {quantity: 1, fromStackId: 1, toStackId: 2},
        ]
      }
      const result: StackType[] = rearrangeStacks(input)
      const expected: StackType[] = [
        {crates: ['[C]']},
        {crates: ['[M]']},
        {crates: ['[P]', '[D]', '[N]', '[Z]']},
      ]
      expect(result).toStrictEqual(expected)
    })


    it('gets a crane operations input with one multi-quantity rearrangement procedure and by using multi-grab it returns the modifed stacks', () => {
      const input: CraneOperationType = {
        stacks: [
          {crates: ['[Z]', '[N]']},
          {crates: ['[M]', '[C]', '[D]']},
          {crates: ['[P]']},
        ],
        rearrangementProcedures: [
          {quantity: 2, fromStackId: 2, toStackId: 1},
        ]
      }
      const result: StackType[] = rearrangeStacks(input, true)
      const expected: StackType[] = [
        {crates: ['[Z]', '[N]', '[C]', '[D]']},
        {crates: ['[M]']},
        {crates: ['[P]']},
      ]
      expect(result).toStrictEqual(expected)
    })

    it('gets a crane operations input with four rearrangement procedures and by using multi-grab it returns the modifed stacks', () => {
      const input: CraneOperationType = {
        stacks: [
          {crates: ['[Z]', '[N]']},
          {crates: ['[M]', '[C]', '[D]']},
          {crates: ['[P]']},
        ],
        rearrangementProcedures: [
          {quantity: 1, fromStackId: 2, toStackId: 1},
          {quantity: 3, fromStackId: 1, toStackId: 3},
          {quantity: 2, fromStackId: 2, toStackId: 1},
          {quantity: 1, fromStackId: 1, toStackId: 2},
        ]
      }
      const result: StackType[] = rearrangeStacks(input, true)
      const expected: StackType[] = [
        {crates: ['[M]']},
        {crates: ['[C]']},
        {crates: ['[P]', '[Z]', '[N]', '[D]']},
      ]
      expect(result).toStrictEqual(expected)
    })
  })

  describe('collectTopCratesAfterCraneOperations', () => {
    it('gets an empty crane operations as input and returns an empty string', () => {
      const input: StackType[] = []
      const result: string = collectTopCratesAfterCraneOperations(input)
      expect(result).toBe('')
    })

    it('gets a crane operation with one stack as input and returns the top crate of that stack', () => {
      const input: StackType[] = [{crates: ['[P]', '[D]', '[N]', '[Z]']}]
      const result: string = collectTopCratesAfterCraneOperations(input)
      expect(result).toBe('Z')
    })

    it('gets the crane operations as input and returns the top crate of each stack', () => {
      const input: StackType[] = [
        {crates: ['[C]']},
        {crates: ['[M]']},
        {crates: ['[P]', '[D]', '[N]', '[Z]']},
      ]
      const result: string = collectTopCratesAfterCraneOperations(input)
      expect(result).toBe('CMZ')
    })
  })

  describe('solves puzzle #1', () => {
    it('gets the crane operations as input and returns the top crate of each stack', () => {
      const craneOperations = parseCraneOperationType(aoc.puzzleInput)
      const finalStacks = rearrangeStacks(craneOperations)
      const solution: string = collectTopCratesAfterCraneOperations(finalStacks)
      console.log('puzzle #1 answer: ', solution)
      expect(solution).toBe('TGWSMRBPN')
    })
  })

  describe('solves puzzle #2', () => {
    it('gets the crane operations as input and by using multi-grab it returns the top crate of each stack', () => {
      const craneOperations = parseCraneOperationType(aoc.puzzleInput)
      const finalStacks = rearrangeStacks(craneOperations, true)
      const solution: string = collectTopCratesAfterCraneOperations(finalStacks)
      console.log('puzzle #2 answer: ', solution)
      expect(solution).toBe('TZLTLWRNF')
    })
  })
})
