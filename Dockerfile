FROM node:15-alpine
WORKDIR /opt/build
LABEL name "bot image builder"

COPY package.json yarn.lock tsconfig.json ./
RUN npm i
COPY src src/
RUN npm run build

CMD [ "npm", "start:prod" ]