####################################################
# Base node image for dev + builder
####################################################
FROM node:12-alpine as dev
LABEL maintainer "Charlie McClung <charlie@bowtie.co>"
ENV BASE_DIR /app
RUN mkdir -p ${BASE_DIR} && \
    npm i -g npm && \
    apk add --no-cache git openssh bash
WORKDIR ${BASE_DIR}
COPY package.json package-lock.json ./
RUN npm install
COPY . ${BASE_DIR}
CMD [ "npm", "start" ]


####################################################
# run nginx static
####################################################
FROM nginx:alpine AS proxy

LABEL maintainer "Charlie McClung <charlie@bowtie.co>"

RUN rm -rf /etc/nginx/conf.d/sites-enabld/*

COPY nginx/conf.d/proxy.conf /etc/nginx/conf.d/
