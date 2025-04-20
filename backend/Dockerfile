# Backend Dockerfile
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Your backend listens on 3000
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]
