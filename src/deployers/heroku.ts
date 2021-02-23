import fetch from '@mersocarlin/fetch'

import { buildDockerImage } from '../utils/docker'
import { runCommand } from '../utils/spawn'
import * as colors from '../cli/colors'
import * as utils from '../cli/utils'

type Config = {
  herokuApiKey: string
  herokuAppName: string
  containerRegistryHost: string
  containerRegistryPassword: string
  containerRegistryUsername: string
  dockerfilePath: string
  verbose: boolean
  startTime: number[]
}

type UpdateDockerImageConfig = {
  imageId: string
  herokuApiKey: string
  herokuAppName: string
}

async function updateHerokuDockerImage(config: UpdateDockerImageConfig) {
  try {
    const { body, statusCode } = await fetch(
      `https://api.heroku.com/apps/${config.herokuAppName}/formation`,
      {
        body: {
          updates: [
            {
              docker_image: config.imageId,
              type: 'web',
            },
          ],
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.heroku+json; version=3.docker-releases',
          Authorization: `Bearer ${config.herokuApiKey}`,
        },
        method: 'patch',
      },
    )

    if (statusCode !== 200) {
      utils.error(`[Heroku] Could not update docker image to ${config.imageId}`)
      utils.error(`Response: ${JSON.stringify(body)}`)
      utils.exit()
    }
  } catch (error) {
    utils.error(`[Heroku] Could not update docker image to ${config.imageId}`)
    throw error
  }
}

export async function deploy(config: Config) {
  const releaseImageName = `${config.containerRegistryHost}/${config.herokuAppName}/web`

  utils.info('Deploying your app to Heroku')
  utils.info('Building docker image')
  utils.log(colors.info('Release image name:'), releaseImageName)

  await buildDockerImage({
    ...config,
    buildImageName: `mersocarlin/${config.herokuAppName}`,
    releaseImageName,
  })

  const imageId = await runCommand(
    `docker inspect ${releaseImageName} --format={{.Id}}`,
    {
      printCommand: config.verbose,
      returnStdout: true,
    },
  )
  utils.log(colors.info('Docker image id:'), `${imageId}`)

  await updateHerokuDockerImage({
    herokuApiKey: config.herokuApiKey,
    herokuAppName: config.herokuAppName,
    imageId: `${imageId}`,
  })

  utils.success('Deployed to Heroku!')
}
