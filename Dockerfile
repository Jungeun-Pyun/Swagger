FROM keymetrics/pm2:10-alpine

EXPOSE 4000:4000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /app

COPY ./package*.json ./

RUN npm i --production

COPY ./server ./server

CMD ["sh", "-c", "NODE_ENV=$NODE_ENV node ./server/bin/www"]