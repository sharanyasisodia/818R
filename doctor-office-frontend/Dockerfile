# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
# Setting NODE_ENV to production ensures only production dependencies are installed
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Build the production assets (if this is a React frontend, for example)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Serve the build files using `serve`, explicitly set to port 3001
CMD ["npx", "serve", "-s", "build", "-l", "3001"]
