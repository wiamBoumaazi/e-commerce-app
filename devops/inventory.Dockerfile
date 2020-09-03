FROM node:10-alpine

WORKDIR /main
COPY ./backend/inventory.js /main/backend
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 4003

CMD [ "node", "./backend/inventory.js" ]