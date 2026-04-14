FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:25-slim@sha256:d643f8878f9f9e6eed5448009d49e745e32701c9f3bd5a5fcd3cb89dd7b8be8e

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
