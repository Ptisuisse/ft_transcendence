FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache sqlite

COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "app.js"]