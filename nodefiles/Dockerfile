FROM node:alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install 

COPY . .


USER node

COPY --chown=node:node . .

CMD ["npm","run","dev"]