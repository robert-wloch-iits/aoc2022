import {describe, it, expect} from 'vitest'

import {
  FileType,
  createFile,
  DirectoryType,
  createDirectory,
  CommandType,
  createCommand,
  ShellHistoryType,
  createShellHistoryType,
  parseShellHistory,
} from '@/aoc2022/day07'

const aoc = {
  puzzleInput: ``
}

describe('day07', () => {
  describe('createFile', () => {
    it('gets an empty string as input and returns a file with null value as name', () => {
      const result: FileType = createFile(``)
      const expected: FileType = {name: null, size: 0}
      expect(result).toStrictEqual(expected)
    })

    it('gets a file string as input and returns file object with those values', () => {
      const result: FileType = createFile(`14848514 b.txt`)
      const expected: FileType = {name: 'b.txt', size: 14848514}
      expect(result).toStrictEqual(expected)
    })
  })

  describe('createDirectory', () => {
    it('gets an empty string as input and returns a directory with null value as name', () => {
      const result: DirectoryType = createDirectory(``)
      const expected: DirectoryType = {name: null, entries: []}
      expect(result).toStrictEqual(expected)
    })

    it('gets a directory string as input and returns directory object with those values', () => {
      const result: DirectoryType = createDirectory(`dir d`)
      const expected: DirectoryType = {name: 'd', entries: []}
      expect(result).toStrictEqual(expected)
    })
  })

  describe('createCommand', () => {
    const testData = [
      {input: '', expectedName: null, expectedArgument: null},
      {input: '$ ls', expectedName: 'ls', expectedArgument: null},
      {input: '$ cd d', expectedName: 'cd', expectedArgument: 'd'},
    ]
    it.each(testData)('gets "$input" as command string as input and returns a command object with name=$expectedName and argument=$expectedArgument', ({input, expectedName, expectedArgument}) => {
      const result: CommandType = createCommand(input)
      const expected: CommandType = {name: expectedName, argument: expectedArgument}
      expect(result).toStrictEqual(expected)
    })
  })

  describe('createShellHistoryType', () => {
    const testData = [
      {input: '14848514 b.txt', expected: {name: 'b.txt', size: 14848514}},
      {input: 'dir d', expected: {name: 'd', entries: []}},
      {input: '$ ls', expected: {name: 'ls', argument: null}},
      {input: '$ cd d', expected: {name: 'cd', argument: 'd'}},
    ]
    it.each(testData)('gets "$input" as command string as input and returns a command object with $expected', ({input, expected}) => {
      const result: ShellHistoryType = createShellHistoryType(input)
      expect(result).toStrictEqual(expected)
    })
  })

  describe('parseShellHistory', () => {
    it('gets an empty string as input and returns an empty shell history', () => {
      const input = ``
      const result: ShellHistoryType[] = parseShellHistory(input)
      const expected: ShellHistoryType[] = []
      expect(result).toStrictEqual(expected)
    })

    it('gets a list of shell history strings as input and returns a that shell history', () => {
      const input = `$ cd /
      $ ls
      dir a
      14848514 b.txt`
      const result: ShellHistoryType[] = parseShellHistory(input)
      const expected: ShellHistoryType[] = [
        {name: 'cd', argument: '/'},
        {name: 'ls', argument: null},
        {name: 'a', entries: []},
        {name: 'b.txt', size: 14848514},
      ]
      expect(result).toStrictEqual(expected)
    })
  })
})
  