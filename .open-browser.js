'use strict'
const {exec} = require('child_process')
const osPlatform = require('os').platform()

const browserCommandOnMacOS = `open -a "Google Chrome" --args --incognito --new-tab`
const browserCommandOnLinux = 'google-chrome --incognito --new-window'
const browserCommandOnWindows = 'start chrome --incognito --new-window'

const isWindows = 'win32' === osPlatform
const isLinux = 'linux' === osPlatform
const isMacOS = 'darwin' === osPlatform

let browserCommand = null
if (isMacOS) {
  browserCommand = browserCommandOnMacOS
} else if (isLinux) {
  browserCommand = browserCommandOnLinux
} else if (isWindows) {
  browserCommand = browserCommandOnWindows
}
if (!browserCommand) {
  console.log(
    `Could not identify browser command for OS platform ${osPlatform} in .open-browser.js!`
  )
}

const isE2eTestRun = process.env['E2E_RUN']

const args = process.argv.slice(2)
// console.log(JSON.stringify(args), browserCommand)
if (!isE2eTestRun && browserCommand && args.length > 0) {
  // vite preview sends "preview" as first argument!
  const url = args.length === 2 ? args[1] : args[0]
  // console.log(`exec: ${browserCommand} ${url}`);
  exec(
    `${browserCommand} ${url}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`open-browser: error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`open-browser: stderr: ${stderr}`)
        return
      }
    }
  )
}
