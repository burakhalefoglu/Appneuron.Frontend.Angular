### STAGE 1: Build ###
FROM node:16.14.0 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm i -g @angular/cli@13.2.3

# Install app dependencies:
RUN npm i

COPY . .
RUN ng build --configuration production  --optimization true --build-optimizer true
### STAGE 2: Run ###
FROM nginx:stable-alpine
COPY nginx.conf nginx.conf
COPY --from=build ./usr/src/app/dist/Appneuron.Frontend.Angular/* /usr/share/nginx/html
EXPOSE 80

