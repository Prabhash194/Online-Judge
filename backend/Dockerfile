FROM node:20-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .
RUN apk update && apk add --no-cache g++

ARG MONGO_URL=""
ARG SUBMISSION_PORT=""

ENV MONGO_URL="mongodb+srv://project194:project194@cluster0.phgcnte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0://prabhashdev"
ENV SUBMISSION_PORT=8000

EXPOSE 8000
CMD ["npm", "run", "dev"]


