# Stage 1: Build
FROM node:24-slim as build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
