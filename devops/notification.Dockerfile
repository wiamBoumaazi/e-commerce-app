FROM node:10-alpine

WORKDIR /main
COPY ./package.json /main
COPY ./package-lock.json /main
COPY ./backend/notification.js /main/backend

RUN npm install

EXPOSE 4008

CMD ["node","/backend/notification.js"]