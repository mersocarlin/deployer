import { spawn, spawnSync } from 'child_process'

import * as utils from '../cli/utils'

type Options = {
  printCommand?: boolean
  returnStdout?: boolean
}

function maybePrintCommand(command: string, options?: Options) {
  if (!options || !options.printCommand) {
    return
  }

  utils.command(command)
}

function runSpawn(command: string) {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ')
    const child = spawn(cmd, args, {
      stdio: [process.stdin, process.stdout, process.stderr],
    })

    child.once('exit', (code: number) => {
      if (code === 0) {
        resolve(undefined)
      } else {
        reject(new Error('Exit with error code: ' + code))
      }
    })

    child.once('error', (err: Error) => {
      reject(err)
    })
  })
}

function runSpawnSync(command: string) {
  return new Promise(resolve => {
    const [cmd, ...args] = command.split(' ')
    const child = spawnSync(cmd, args)

    const stdout = child.stdout.toString()
    return resolve(stdout.substring(0, stdout.lastIndexOf('\n')))
  })
}

export function runCommand(command: string, options?: Options) {
  maybePrintCommand(command, options)

  if (options && options.returnStdout) {
    return runSpawnSync(command)
  }

  return runSpawn(command)
}
