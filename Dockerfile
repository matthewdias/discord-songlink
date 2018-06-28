FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN apk add --no-cache git python build-base && \
    npm install && \
    apk del build-base python && \
    rm -rf /var/cache/apk

CMD [ "npm", "start" ]
