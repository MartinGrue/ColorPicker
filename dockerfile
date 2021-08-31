# base image
FROM node:alpine as build-stage

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .
COPY . .
RUN npm install --force
RUN npm run build

FROM nginx
COPY --from=build-stage /app/build/ /var/www/html
COPY nginx.conf /etc/nginx/conf.d/default.conf