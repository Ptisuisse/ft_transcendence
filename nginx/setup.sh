#!/bin/sh

if [ ! -f /etc/nginx/ssl/selfsigned.crt ]; then
  echo "Generating self-signed SSL certificate..."
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/selfsigned.key \
    -out /etc/nginx/ssl/selfsigned.crt \
    -subj "/CN=localhost"
fi

exec nginx -g "daemon off;"