FROM node:18

WORKDIR /src
COPY . .

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000
