FROM node:20-alpine

WORKDIR /usr/src/app

# Installer SQLite
RUN apk add --no-cache sqlite

# Copier les fichiers nécessaires
COPY package*.json ./
RUN npm install
COPY . .

# Exécuter le script d'initialisation de la base de données
CMD ["node", "app.js"]