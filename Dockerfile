FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --silent

COPY . .

RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
