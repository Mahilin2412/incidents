
FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN apt update && apt install dnsutils -y
RUN apt install nano
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
