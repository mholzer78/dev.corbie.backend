FROM node:25-alpine

RUN apk add inkscape

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3100

CMD ["node", "dist/app.js"]