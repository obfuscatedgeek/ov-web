FROM node:6.11.3

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install

RUN npm install next

# Bundle app source
COPY . /usr/src/app

RUN npm run build

EXPOSE 4000

CMD [ "npm", "start" ]
