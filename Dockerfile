# Multi-stage build for optimal production image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --no-audit --prefer-offline && \
    npm cache clean --force

# Build the application
FROM base AS builder
WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm ci --no-audit --prefer-offline

# Copy source code
COPY . .

# Set build-time environment variables
ARG VITE_API_BASE_URL=http://localhost:8000
ARG VITE_ENVIRONMENT=production
ARG VITE_APP_NAME=Portfolio
ARG VITE_APP_VERSION=latest

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_ENVIRONMENT=$VITE_ENVIRONMENT
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_APP_VERSION=$VITE_APP_VERSION

# Build the application
RUN npm run build

# Production image with nginx
FROM nginx:1.25-alpine AS runner

# Create nginx user and set permissions
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Copy custom nginx configuration
COPY --chown=nextjs:nodejs docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/dist /usr/share/nginx/html

# Create necessary directories with proper permissions
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
    chown -R nextjs:nodejs /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]