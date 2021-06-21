FROM node:14-alpine as build-stage
RUN npm install -g npm
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine as production-stage
RUN npm install -g npm
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY ./server.js /app/server.js
COPY ./backend /app/backend
COPY --from=build-stage /app/static /app/static
CMD [ "node", "server.js" ]