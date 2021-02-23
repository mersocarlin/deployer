import { runCommand } from './spawn'

type BuildDockerImageConfig = {
  buildImageName: string
  containerRegistryHost: string
  containerRegistryPassword: string
  containerRegistryUsername: string
  dockerfilePath: string
  releaseImageName: string
  verbose: boolean
}

export async function buildDockerImage({
  buildImageName,
  containerRegistryHost,
  containerRegistryPassword,
  containerRegistryUsername,
  dockerfilePath,
  releaseImageName,
  verbose,
}: BuildDockerImageConfig) {
  await runCommand('docker --version', { printCommand: verbose })
  await runCommand(
    `docker login ${containerRegistryHost} -u ${containerRegistryUsername} -p ${containerRegistryPassword}`,
    { printCommand: false }
  )
  await runCommand(`docker build -f ${dockerfilePath} -t ${buildImageName} .`, {
    printCommand: verbose,
  })
  await runCommand(`docker tag ${buildImageName} ${releaseImageName}`, {
    printCommand: verbose,
  })
  await runCommand(`docker push ${releaseImageName}`, {
    printCommand: verbose,
  })
  await runCommand(`docker logout ${containerRegistryHost}`, {
    printCommand: verbose,
  })
}
