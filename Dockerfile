# Development Build Container
# This container is forgotten after the build is complete
FROM node:20

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Container
# This is the final container that is saved / published to the registry
FROM nginx:stable-alpine

# Copy the build output from build container into this production container
COPY --from=0 /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]