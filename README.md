# deployer

Deployer CLI by @mersocarlin.

## Heroku Provider

Deploy Heroku applications by publishing a new Docker image to Heroku Docker registry.

```bash
npx mersocarlin-deployer \
  --provider heroku \
  --container-registry-host registry.heroku.com \
  --container-registry-username <heroku-registry-username> \
  --container-registry-password <heroku-registry-password> \
  --dockerfile-path <path-to-Dockerfile> \
  --heroku-app-name <heroku-app-name> \
  --heroku-api-key <heroku-api-key>
```
