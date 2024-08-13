FROM node:18.20.4-slim
WORKDIR /app
COPY . /app/
RUN npm install
EXPOSE 3000
CMD [ "npm start"]