
FROM node:lts-alpine as build-stage
ARG API
ARG SENTRY_DSN
ARG SENTRY_ORIGIN

WORKDIR /app
COPY package*.json ./
RUN npm install -g @vue/cli
RUN npm install -g @quasar/cli
RUN npm ci
COPY . .
RUN API=$API SENTRY_DSN=$SENTRY_DSN SENTRY_ORIGIN=$SENTRY_ORIGIN quasar build

EXPOSE 8080

CMD [ "npm", "start" ]
