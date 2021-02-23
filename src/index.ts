import Commander from 'commander'
import prettyHrtime from 'pretty-hrtime'

import pkg from '../package.json'
import * as utils from './cli/utils'
import { deploy } from './deployers/heroku'

const program = new Commander.Command(pkg.name)
  .version(pkg.version)
  .requiredOption('--provider <value>', 'Provider to deploy application')
  .option('--verbose', 'Enable verbose mode')
  // docker image config
  .option('--container-registry-host <value>', 'Container registry host')
  .option(
    '--container-registry-username <value>',
    'Container registry username',
  )
  .option(
    '--container-registry-password <value>',
    'Container registry password',
  )
  .option('--dockerfile-path <value>', 'Path to Dockerfile')
  // Heroku config
  .option('--heroku-api-key <value>', 'Heroku api key')
  .option('--heroku-app-name <value>', 'Name of Heroku app')
  .parse(process.argv)

async function run(): Promise<void> {
  const startTime = process.hrtime()

  const {
    provider,
    containerRegistryHost,
    containerRegistryPassword,
    containerRegistryUsername,
    dockerfilePath,
    herokuApiKey,
    herokuAppName,
    verbose,
  } = program.opts()

  utils.header()

  const strProvider = provider.toLowerCase()

  if (strProvider === 'heroku') {
    await deploy({
      containerRegistryHost,
      containerRegistryPassword,
      containerRegistryUsername,
      dockerfilePath,
      herokuApiKey,
      herokuAppName,
      verbose: Boolean(verbose),
      startTime,
    })
  }

  const endTime = process.hrtime(startTime)

  utils.success(`Done in ${prettyHrtime(endTime)}`)

  utils.footer()
}

run().catch(() => {
  utils.exit('Error while deploying')
})
