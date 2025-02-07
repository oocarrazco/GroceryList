# Stage 1: Build the Angular application
FROM node:18 as builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files and build the app
COPY . .
RUN npm run build --prod

# Stage 2: Serve the Angular application using Nginx
FROM nginx:stable-alpine

# Copy built Angular files to Nginx html directory
COPY --from=builder /app/dist/grocery-list/browser /usr/share/nginx/html

# Expose port 4200
EXPOSE 4200

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]