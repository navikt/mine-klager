FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim@sha256:93a8b934908f9cdff9045b1f66343a56769e4aeb951ce7810028ba1f0a51f421

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

# Patch `console` and Next's internal logger with `next-logger` before Next loads, so all logs are single line JSON.
# Loading it in `instrumentation.ts` is too late for Next's internal logger, which is already referenced by then.
# Part of the entrypoint, so overriding `CMD` does not drop it.
ENTRYPOINT ["node", "--require", "next-logger"]
CMD ["server.js"]
