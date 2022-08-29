import { buildDockerImage } from '../utils/docker'
import * as colors from '../cli/colors'
import * as utils from '../cli/utils'

type Config = {
  containerRegistryHost: string
  containerRegistryPassword: string
  containerRegistryUsername: string
  dockerfilePath: string
  repositoryName: string
  repositoryTag?: string
  startTime: number[]
  verbose: boolean
}

export async function deploy(config: Config) {
  const releaseImageName = `${config.containerRegistryUsername}/${
    config.repositoryName
  }:${config.repositoryTag || 'latest'}`

  utils.info('Deploying your app to Docker Hub')
  utils.info('Building docker image')
  utils.log(colors.info('Release image name:'), releaseImageName)

  await buildDockerImage({
    ...config,
    buildImageName: `mersocarlin/${config.repositoryName}`,
    releaseImageName,
  })

  utils.success('Deployed to Docker Hub!')
}
