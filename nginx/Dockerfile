FROM nginx:alpine

RUN apk add --no-cache openssl

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /etc/nginx/ssl

COPY ./nginx/setup.sh /setup.sh
RUN chmod +x /setup.sh

ENTRYPOINT ["/setup.sh"]