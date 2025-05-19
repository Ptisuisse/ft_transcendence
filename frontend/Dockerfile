# Étape 1 : Construction du frontend
FROM node:20-alpine AS build

WORKDIR /app

# Copier les fichiers du frontend
COPY ./ ./

# Installer les dépendances et construire le frontend
RUN npm install
RUN npm run build

# Étape 2 : Image Nginx pour servir le frontend
FROM nginx:alpine

# Copier les fichiers construits dans le dossier Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]