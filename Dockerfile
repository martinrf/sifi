FROM mhart/alpine-node:10

# Create app directory
WORKDIR /zurbot

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 5600

CMD [ "node", "main.js" ]
