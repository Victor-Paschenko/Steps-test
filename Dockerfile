FROM node:14.16.1

WORKDIR /app
COPY . .
RUN npm install

# CMD [ "npm", "run", "start:dev" ]