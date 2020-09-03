FROM node:10-alpine

WORKDIR /main
COPY ./package.json /main
COPY ./package-lock.json /main
COPY ./frontend /main/frontend

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", "frontend/src/App.js"]