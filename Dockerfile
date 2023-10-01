FROM node:18-alpine as base

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci

ENV NODE_ENV production

FROM node:14-alpine as builder
WORKDIR /app

COPY . .
COPY --from=base /app/node_modules ./node_modules
RUN npm run build

FROM node:14-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist

EXPOSE 3333

CMD ["node", "dist/server.js"]