FROM node:alpine

WORKDIR /usr/src/got

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]