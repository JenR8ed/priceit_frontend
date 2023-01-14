FROM alpine

RUN apk add --update nodejs npm

WORKDIR /src
COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]