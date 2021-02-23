import chalk from 'chalk'

export function bold(...msgs: string[]) {
  return chalk.bold(...msgs)
}

export function info(...msgs: string[]) {
  return chalk.bold.cyan(...msgs)
}

export function error(...msgs: string[]) {
  return chalk.bold.red(...msgs)
}

export function command(...msgs: string[]) {
  return chalk.bold.magenta(...msgs)
}

export function success(...msgs: string[]) {
  return chalk.bold.green(...msgs)
}
