FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

ENV NODE_ENV=production

EXPOSE 3333

CMD ["npm", "run", "start:server"]