FROM node:18-alpine as base

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

FROM base as production

ENV NODE_ENV=production

COPY --from=base /app/dist ./dist

EXPOSE 3333

CMD ["node", "dist/server.js"]