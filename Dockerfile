FROM node:20-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Create a non-root user
RUN adduser --disabled-password --gecos "" appuser
USER appuser

CMD ["node", "src/app.js"] 