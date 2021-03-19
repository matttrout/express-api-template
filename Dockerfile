FROM node:alpine

RUN mkdir -p /srv/www/app && chown -R node:node /srv/www/app
WORKDIR /srv/www/app
COPY package.json yarn.lock ./app
USER node
RUN yarn install --pure-lockfile
COPY --chown=node:node . .
EXPOSE 4000
