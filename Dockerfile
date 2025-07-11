FROM node:alpine AS build


WORKDIR /app


COPY package.json* package-lock.json ./


RUN npm install


COPY . /app/


FROM node:20-slim  AS stage

WORKDIR /app

COPY --from=build /app ./


EXPOSE 4000

CMD ["npm","run","start"]
