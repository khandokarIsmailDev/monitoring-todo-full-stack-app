#!/bin/sh

# Generate Prisma client at runtime
echo "Running Prisma generate..."
npx prisma generate

# Start the application with npm
echo "Starting application..."
npm run dev
