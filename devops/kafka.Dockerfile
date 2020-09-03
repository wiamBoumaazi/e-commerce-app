FROM node:10-alpine

WORKDIR /main
COPY ./package.json /main
COPY ./package-lock.json /main
COPY ./backend/reciptService /main/backend
COPY ./backend/KafkaProducer.js /main/backend
COPY ./backend/KafkaConsumer.js /main/backend
COPY ./backend/consumerTest.js /main/backend

RUN npm install

EXPOSE 5000

CMD ["node", "backend/reciptService.js", "backend/consumerTest.js"]