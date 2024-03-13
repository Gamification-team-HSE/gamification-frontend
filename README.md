# Gamification frontend

## Demo stand

Look to a product here:
[Link to stand on Netlify](https://gamification-frontend.netlify.app)


## Backend

See backend in this [Repository](https://github.com/Gamification-team-HSE/gamification-backend)

## Installing and running via Docker

Require **docker** and **gamification backend**, guide for UNIX system, may be different for Windows

```bash
# Clone
git clone https://github.com/Gamification-team-HSE/gamification-frontend.git <FOLDER_NAME>

CD <FOLDER_NAME>

# Build

# API= your backend URL
# Also available:
# SENTRY_DSN + SENTRY_ORIGIN for Sentry setup
docker build -t game-frontend . --build-arg API='https://vartose.fvds.ru'

# Run
# Also you can use '-d' arg for running in background daemon
docker run -it -p 8080:8080 --rm --name game-frontend game-frontend

# Via Docker-compose
docker compose up
```

## How improve

You can clone project to local and development via our dev backend server for Free. There is not policy for PR, so you can do it on your own format.

## Stack

1. Vue.js
2. Typescript
3. Quasar
4. Graphql
5. i18n
6. axios
