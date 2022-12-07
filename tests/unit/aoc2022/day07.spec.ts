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
  executeCommand,
  parseShellHistoryToFileSystemTree,
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

  describe('executeCommand', () => {
    const dirA: DirectoryType ={name: 'a', entries: []}
    const dirD: DirectoryType = {name: 'd', entries: [dirA]}
    const rootDirectory: DirectoryType = {name: '/', entries: [dirD]}
    const testData = [
      {name: 'ls', argument: null, options: {rootDirectory, parentDirectories: [rootDirectory]}, expectedOptions: {rootDirectory, parentDirectories: [rootDirectory]}},

      {name: 'cd', argument: 'd', options: {rootDirectory, parentDirectories: [rootDirectory]}, expectedOptions: {rootDirectory, parentDirectories: [rootDirectory, dirD]}},

      {name: 'cd', argument: 'a', options: {rootDirectory, parentDirectories: [rootDirectory, dirD]}, expectedOptions: {rootDirectory, parentDirectories: [rootDirectory, dirD, dirA]}},

      {name: 'cd', argument: '..', options: {rootDirectory, parentDirectories: [rootDirectory, dirD, dirA]}, expectedOptions: {rootDirectory, parentDirectories: [rootDirectory, dirD]}},

      {name: 'cd', argument: '/', options: {rootDirectory, parentDirectories: [rootDirectory, dirD]}, expectedOptions: {rootDirectory, parentDirectories: [rootDirectory]}},
    ]
    it.each(testData)('executes command "$name" with argument "$argument" and it modifies the parentDirectory of the options object as expected', ({name, argument, options, expectedOptions}) => {
      executeCommand({name, argument}, options)
      expect(options).toStrictEqual(expectedOptions)
    })
  })

  describe('parseShellHistoryToFileSystemTree', () => {
    it('gets an empty string as input and returns an empty file system tree', () => {
      const input = ``
      const result: DirectoryType = parseShellHistoryToFileSystemTree(input)
      const expected: DirectoryType = {name: '/', entries: []}
      expect(result).toStrictEqual(expected)
    })

    it('gets a list of shell history strings as input and returns that file system tree', () => {
      const input = `$ cd /
      $ ls
      dir a
      14848514 b.txt
      8504156 c.dat
      dir d
      $ cd a
      $ ls
      dir e
      29116 f
      2557 g
      62596 h.lst
      $ cd e
      $ ls
      584 i
      $ cd ..
      $ cd ..
      $ cd d
      $ ls
      4060174 j
      8033020 d.log
      5626152 d.ext
      7214296 k`
      const result: DirectoryType = parseShellHistoryToFileSystemTree(input)
      const expected: DirectoryType =
        {name: '/', entries: [
          {name: 'a', entries: [
            {name: 'e', entries: [
              {name: 'i', size: 584},
            ]},
            {name: 'f', size: 29116},
            {name: 'g', size: 2557},
            {name: 'h.lst', size: 62596},
          ]},
          {name: 'b.txt', size: 14848514},
          {name: 'c.dat', size: 8504156},
          {name: 'd', entries: [
            {name: 'j', size: 4060174},
            {name: 'd.log', size: 8033020},
            {name: 'd.ext', size: 5626152},
            {name: 'k', size: 7214296},
          ]}
        ]}
      expect(result).toStrictEqual(expected)
    })
  })
})
  