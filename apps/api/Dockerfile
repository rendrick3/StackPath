FROM node:24-alpine AS base

WORKDIR /app

# Copy root workspace manifests
COPY package.json package-lock.json* ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/content/package.json ./packages/content/
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

RUN npm install

# Copy source code
COPY packages/shared ./packages/shared
COPY packages/content ./packages/content
COPY apps/api ./apps/api

# Build shared packages & API
RUN npm run build --workspace=packages/shared
RUN npm run build --workspace=packages/content
WORKDIR /app/apps/api
RUN npx prisma generate
RUN npm run build

EXPOSE 4000
CMD ["node", "dist/server.js"]
