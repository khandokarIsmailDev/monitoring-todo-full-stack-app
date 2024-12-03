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

# Entrypoint script modify kora
CMD ["sh", "-c", "DATABASE_URL=${DATABASE_URL} npx prisma generate && npm run dev"]
