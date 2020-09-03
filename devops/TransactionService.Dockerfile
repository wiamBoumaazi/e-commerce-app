FROM node:10-alpine

WORKDIR /main
COPY ./package.json /main
COPY ./package-lock.json /main
COPY ./backend/TransactionService.js /main/backend

RUN npm install

EXPOSE 4002

CMD ["node", "/backend/TransactionService.js"]