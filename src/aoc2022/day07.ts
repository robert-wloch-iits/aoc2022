import {parseInput} from '@/aoc2022/utils'

export type FileType = {
  name: string|null
  size: number
}
export function createFile(fileChunk: string): FileType {
  const parts = parseInput<string>(fileChunk, (chunk) => chunk, ' ')
  return parts.length > 0 ? {size: +parts[0], name: parts[1]} : {name: null, size: 0}
}

export type DirectoryType = {
  name: string|null
  entries: (FileType|DirectoryType)[]
}
export function createDirectory(directoryChunk: string): DirectoryType {
  const parts = parseInput<string>(directoryChunk, (chunk) => chunk, 'dir ')
  return {entries: [], name: parts.length > 1 ? parts[1] : null}
}

export type CommandType = {
  name: string|null
  argument: string|null
}
export function createCommand(commandChunk: string): CommandType {
  const parts = parseInput<string>(commandChunk, (chunk) => chunk, ' ')
  const name = parts.length > 1 ? parts[1] : null
  const argument = parts.length > 2 ? parts[2] : null
  return {name, argument}
}

export type ShellHistoryType = FileType | DirectoryType | CommandType
export function createShellHistoryType(shellHistoryChunk: string): ShellHistoryType {
  let result: ShellHistoryType
  if (shellHistoryChunk.startsWith('$ ')) {
    result = createCommand(shellHistoryChunk)
  } else if (shellHistoryChunk.startsWith('dir ')) {
    result = createDirectory(shellHistoryChunk)
  } else {
    result = createFile(shellHistoryChunk)
  }
  return result
}
export function parseShellHistory(input: string): ShellHistoryType[] {
  const result = parseInput<ShellHistoryType>(input, createShellHistoryType)
  return result
}
