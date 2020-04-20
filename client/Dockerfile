FROM node:current-slim

# Create app directory
WORKDIR /usr/src/app-client


RUN yarn global add serve
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json yarn.lock ./

RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . ./

RUN yarn build

EXPOSE 5000
CMD [ "serve", "-s","build" ]
