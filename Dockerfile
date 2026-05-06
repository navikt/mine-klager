FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:25-slim@sha256:77f21deda0ee7cc1c212f8e5dfd0dc83bd950a7e65c9ca4adf08b06176c1e8da

WORKDIR /app

ENV NODE_ENV=production
# Disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

COPY ./public ./public
COPY .next/standalone ./

ARG VERSION
ENV VERSION=$VERSION

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["server.js"]
