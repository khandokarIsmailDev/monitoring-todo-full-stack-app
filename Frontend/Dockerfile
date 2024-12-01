FROM node:alpine as build
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Create config template
RUN echo '{"VITE_BACKEND_URL": "${VITE_BACKEND_URL}"}' > /usr/share/nginx/html/config.template.json

# Create env substitution script
RUN echo '#!/bin/sh' > /docker-entrypoint.d/40-substitute-env.sh && \
    echo 'envsubst < /usr/share/nginx/html/config.template.json > /usr/share/nginx/html/config.json' >> /docker-entrypoint.d/40-substitute-env.sh && \
    chmod +x /docker-entrypoint.d/40-substitute-env.sh

# Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf