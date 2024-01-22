FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=5m --timeout=3s \
    CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
