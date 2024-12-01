FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install both production and development dependencies
RUN npm install

# Copy the rest of the application code
COPY . .



# Expose the application port
EXPOSE 4100

# Use an entrypoint script for dynamic Prisma generation and app start
ENTRYPOINT ["sh", "/app/entrypoint.sh"]
