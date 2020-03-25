FROM node:10

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

WORKDIR /usr/src/app/client

RUN npm install

RUN npm run build

WORKDIR /usr/src/app/

ENV PROD true

ENV DB_CONN mongodb+srv://airsharedb:jzweLFI9xpuba2Je@cluster0-apls7.mongodb.net/countrydb?retryWrites=true&w=majority

EXPOSE 5000

CMD ["npm", "start"]