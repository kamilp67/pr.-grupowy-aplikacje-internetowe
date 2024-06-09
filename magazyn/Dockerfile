FROM alpine:3.19.1

RUN apk update && apk upgrade
RUN apk add --update nodejs npm

WORKDIR /magazyn
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

VOLUME /magazyn/node_modules

EXPOSE 5170

CMD ["sh", "-c", "cd /magazyn && npm run dev -- --host"]
