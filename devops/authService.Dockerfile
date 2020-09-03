FROM node:10-alpine

WORKDIR /main
COPY ./package.json /main
COPY ./package-lock.json /main
COPY ./backend/authService.js /main/backend

RUN npm install

EXPOSE 4000

CMD ["node","/backend/authService.js"]