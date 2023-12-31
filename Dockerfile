
FROM node:16-alpine

WORKDIR /app

COPY package.json .
RUN npm install
RUN npm install -g serve

COPY . .

EXPOSE 3000

CMD [ "serve", "build" ]
