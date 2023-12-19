# Use an official Node runtime as a base image
FROM node:16.14.0 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN rm -rf /app/build
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
