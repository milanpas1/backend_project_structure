# Use Node.js LTS version
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]