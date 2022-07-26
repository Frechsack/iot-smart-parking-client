# stage 1
FROM node:alpine AS my-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build
# stage 2
FROM nginx:alpine
COPY --from=my-app-build /app/dist/iot-smart-parking-client /usr/share/nginx/html
