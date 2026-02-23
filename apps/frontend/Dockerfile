FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

# El código fuente se monta como volumen en docker-compose
EXPOSE 8081

CMD ["npm", "run", "web"]
