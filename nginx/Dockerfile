FROM nginx:alpine

# Copier la configuration personnalisée de Nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]