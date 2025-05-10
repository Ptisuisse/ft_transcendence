FROM alpine:latest

RUN apk add --no-cache sqlite

WORKDIR /data

COPY init.sql /docker-entrypoint-initdb.d/init.sql

RUN sqlite3 /data/database.db < /docker-entrypoint-initdb.d/init.sql || true

VOLUME ["/data"]

CMD ["tail", "-f", "/dev/null"]