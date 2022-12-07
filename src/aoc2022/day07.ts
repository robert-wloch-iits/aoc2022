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
  size: number
}
type DirectoryOptionsType = {
  rootDirectory: DirectoryType,
  parentDirectories: DirectoryType[],
}
export function createDirectory(directoryChunk: string): DirectoryType {
  const parts = parseInput<string>(directoryChunk, (chunk) => chunk, 'dir ')
  return {entries: [], name: parts.length > 1 ? parts[1] : null, size: 0}
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

function isDirectory(dir: FileType | DirectoryType): dir is DirectoryType {
  return (<DirectoryType>dir).entries !== undefined;
}
function currentParent(options: DirectoryOptionsType): DirectoryType {
  return options.parentDirectories.length > 0 ? options.parentDirectories[options.parentDirectories.length - 1] : options.rootDirectory
}
export function executeCommand(command: CommandType, options?: DirectoryOptionsType) {
  if (!options || 'ls' === command.name) return

  if ('cd' === command.name) {
    if ('..' === command.argument) {
      if (options.parentDirectories.length > 0) {
        options.parentDirectories.pop()
      }
    } else if ('/' === command.argument) {
      options.parentDirectories.splice(1)
    } else {
      const parent = currentParent(options)
      const childDirectory = parent.entries.find((d) => isDirectory(d) && d.name === command.argument) as DirectoryType
      if (childDirectory) {
        options.parentDirectories.push(childDirectory)
      }
    }
  }
}

export function addSizeInTreeToRoot(entry: FileType | DirectoryType, options?: DirectoryOptionsType) {
  if (options?.parentDirectories) {
    options.parentDirectories.forEach((d) => d.size += entry.size)
  }
}

export type ShellHistoryType = FileType | DirectoryType | CommandType
function addEntry(entry: FileType | DirectoryType, options?: DirectoryOptionsType) {
  if (options?.parentDirectories) {
    const parent = currentParent(options)
    if (!parent.entries.includes(entry)) {
      parent.entries.push(entry)
      addSizeInTreeToRoot(entry, options)
    }
  }
}
export function createShellHistoryType(shellHistoryChunk: string, options?: DirectoryOptionsType): ShellHistoryType {
  let result: ShellHistoryType
  if (shellHistoryChunk.startsWith('$ ')) {
    result = createCommand(shellHistoryChunk)
    executeCommand(result, options)
  } else if (shellHistoryChunk.startsWith('dir ')) {
    result = createDirectory(shellHistoryChunk)
    addEntry(result, options)
  } else {
    result = createFile(shellHistoryChunk)
    addEntry(result, options)
  }
  return result
}
export function parseShellHistoryToFileSystemTree(input: string): DirectoryType {
  const rootDirectory: DirectoryType = {name: '/', entries: [], size: 0}
  const options: DirectoryOptionsType = {
    rootDirectory,
    parentDirectories: [rootDirectory]
  }

  parseInput<ShellHistoryType, DirectoryOptionsType>(input, createShellHistoryType, '\n', options)
  return rootDirectory
}


export function sumDirectorySizes(directory: DirectoryType, sizeSelectorFn: (size: number) => number): number {
  let result = sizeSelectorFn(directory.size)
  if (directory.entries.length > 0) {
    directory.entries.forEach((entry) => {
      if (isDirectory(entry)) {
        result += sumDirectorySizes(entry, sizeSelectorFn)
      }
    })
  }
  return result
}

export function findDirectoryBySize(
  directory: DirectoryType, 
  sizeSelectorFn: (directorySize: number, currentSelection: number) => number, 
  currentSelection = 0): number
  {
  let result: number = sizeSelectorFn(directory.size, currentSelection)
  if (directory.entries.length > 0) {
    directory.entries.forEach((entry) => {
      if (isDirectory(entry)) {
        result = findDirectoryBySize(entry, sizeSelectorFn, result)
      }
    })
  }
  return result
}