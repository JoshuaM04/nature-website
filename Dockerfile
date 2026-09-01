# Dependencies are installed on their own layer so that editing source does not
# reinstall them. The layer is rebuilt only when package.json or the lockfile
# changes.
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# The build prerenders the routes, which means it reaches iNaturalist and
# Wikimedia over the network. Without outbound access the build still succeeds
# and the pages come out empty.
FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# The image that ships carries no toolchain and no source: only the server that
# `output: "standalone"` emitted, the assets it serves, and the public folder
# the field notes read their video and captions out of at request time.
FROM node:24-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Next writes its cache here, so the process needs to own the directory to
# revalidate the news and the plates while the container is up.
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
