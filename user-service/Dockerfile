FROM node:22.16.0-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=development

EXPOSE 5000

CMD ["npm", "run", "dev"]
