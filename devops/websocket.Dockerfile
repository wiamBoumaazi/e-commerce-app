FROM node:10-alpine

WORKDIR /main
COPY ./backend/websocket.js /main/backend
COPY ./package.json /main
COPY ./package-lock.json /main

RUN npm install

EXPOSE 4008

CMD [ "node", "./backend/websocket.js" ]
