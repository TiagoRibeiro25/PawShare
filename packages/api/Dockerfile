# nodejs api
FROM node:18.16.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port 5000
EXPOSE 5000

# Run app
CMD [ "npm", "start" ]
