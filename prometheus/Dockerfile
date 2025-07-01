FROM alpine:latest

ARG PROMETHEUS_VERSION=2.53.0
ARG TARGETARCH=amd64

RUN apk add --no-cache gettext wget tar

RUN wget "https://github.com/prometheus/prometheus/releases/download/v${PROMETHEUS_VERSION}/prometheus-${PROMETHEUS_VERSION}.linux-${TARGETARCH}.tar.gz" -O /tmp/prometheus.tar.gz && \
    tar -xzf /tmp/prometheus.tar.gz -C /tmp && \
    mv /tmp/prometheus-${PROMETHEUS_VERSION}.linux-${TARGETARCH}/prometheus /bin/prometheus && \
    rm -rf /tmp/*

COPY prometheus.yml.template /etc/prometheus/prometheus.yml.template

ENTRYPOINT [ "/bin/sh", "-c" ]

CMD [ "envsubst < /etc/prometheus/prometheus.yml.template > /etc/prometheus/prometheus.yml && exec /bin/prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/prometheus" ]