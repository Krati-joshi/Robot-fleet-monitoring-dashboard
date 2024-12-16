FROM node:16


WORKDIR /app

COPY Frontend/package.json Frontend/package-lock.json ./


RUN npm install

COPY Frontend/ ./


EXPOSE 3000


CMD ["npm", "start"]
