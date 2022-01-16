FROM node:alpine
ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build


USER node

CMD ["npm","start"]