FROM node:18-alpine

WORKDIR /books-mixer-ai/
COPY ./public /books-mixer-ai/public
COPY ./src /books-mixer-ai/src
COPY ./package.json /books-mixer-ai/

RUN npm install

ENTRYPOINT ["npm", "start"]
