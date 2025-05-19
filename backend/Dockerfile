# Backend Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy project files
COPY ./ ./

# Install dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000

# Run the server
CMD ["node", "index.js"]
