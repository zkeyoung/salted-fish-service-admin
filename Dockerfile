FROM node:18-alpine
WORKDIR /usr/src/salted-fish-market-service

COPY package.json package.json
RUN npm install

COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]