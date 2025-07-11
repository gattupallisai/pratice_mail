# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Build your app (only if you have a build step, e.g., Next.js or React)
RUN npm run build

# Stage 2: Run
FROM node:18-alpine

WORKDIR /app

# Copy built code and node_modules from builder
COPY --from=builder /app .

# Expose port (change if your app uses a different port)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
