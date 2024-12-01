#!/bin/sh
# Replace placeholders in the HTML files with environment variables
envsubst '${VITE_BACKEND_URL}' < /usr/share/nginx/html/index.html.template > /usr/share/nginx/html/index.html
exec nginx -g "daemon off;"
