FROM node

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

RUN npm i

COPY . /app

ENV PORT 3006

EXPOSE 3006

CMD ["node","app.js"]