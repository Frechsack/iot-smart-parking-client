# stage 1
FROM node:18-alpine AS my-app-build
WORKDIR /app
COPY . .
RUN npm install && npm run build
# stage 2
FROM nginx:alpine
COPY --from=my-app-build /app/dist/iot-smart-parking-client /usr/share/nginx/html
