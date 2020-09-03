FROM node:10-alpine

WORKDIR /main
COPY ./backend/gateway.js /main
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 4001

CMD [ "ndoe", "gateway.js" ]