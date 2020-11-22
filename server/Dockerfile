FROM node:14.15-alpine as build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build
RUN yarn run test

FROM node:14.15-alpine

WORKDIR /app

COPY --from=build /app/dist/server.js /app
RUN mkdir /app/wwwroot

CMD ["node", "server.js"]
