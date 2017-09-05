FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app/client
RUN mkdir -p /usr/src/app/server

WORKDIR /usr/src/app/client
# Bundle client source
ADD client /usr/src/app/client/
# Install client dependencies
RUN yarn

WORKDIR /usr/src/app/server
# Bundle server source
ADD server /usr/src/app/server/
# Install server dependencies
RUN yarn

WORKDIR /usr/src/app

RUN yarn

EXPOSE 4000
CMD [ "npm", "run", "start:prod" ]
