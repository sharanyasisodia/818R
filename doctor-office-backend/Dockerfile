# Use an official Node.js runtime as the base image
FROM node:18

# Set the environment to production
ENV NODE_ENV=production

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
