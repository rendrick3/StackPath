FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/content/package.json ./packages/content/
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

RUN npm install

COPY packages/shared ./packages/shared
COPY packages/content ./packages/content
COPY apps/web ./apps/web

RUN npm run build --workspace=packages/shared
RUN npm run build --workspace=packages/content
WORKDIR /app/apps/web
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
