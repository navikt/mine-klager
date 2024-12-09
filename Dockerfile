FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production
# Disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

COPY ./public ./public
COPY .next/standalone ./

EXPOSE 8080

ENV PORT=8080
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
