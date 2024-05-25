FROM alpine:3.19.1

RUN apk update && apk upgrade
RUN apk add --update nodejs npm

WORKDIR /frontend
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

VOLUME /frontend/node_modules

EXPOSE 5173

CMD ["sh", "-c", "cd /frontend && npm run dev -- --host"]