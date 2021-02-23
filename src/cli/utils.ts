import pkg from '../../package.json'
import * as colors from './colors'

const SPACER = '  '

/**
 * Prints messages to console.
 * @param {...string} [msgs]
 */
export function log(...msgs: string[]) {
  console.log(SPACER, ...msgs)
}

/**
 * Prints app header to console.
 */
export function header() {
  log()
  log(colors.bold(pkg.name), colors.info(pkg.version))
}

/**
 * Prints app footer to console.
 */
export function footer() {
  log()
}

/**
 * Prints command to console.
 * @param {...string} [msgs]
 */
export function command(...msgs: string[]) {
  log()
  log(colors.command(...msgs))
}

/**
 * Prints info messages to console.
 * @param {...string} [msgs]
 */
export function info(...msgs: string[]) {
  log()
  log(colors.info(...msgs))
}

/**
 * Prints success messages to console.
 * @param {...string} [msgs]
 */
export function success(...msgs: string[]) {
  log()
  log(colors.success(...msgs))
}

/**
 * Prints error messages to console.
 * @param {...string} [msgs]
 */
export function error(...msgs: string[]) {
  log()
  console.error(SPACER, colors.error(msgs.join(' ')))
}

/**
 * Kills the process. Optionally prints error messages to console.
 * @param {...string} [msgs]
 */
export function exit(...msgs: string[]) {
  msgs.length && error(...msgs)
  footer()
  process.exit(1)
}
