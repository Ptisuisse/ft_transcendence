FROM node:20-bullseye

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y sqlite3 && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "app.js"]