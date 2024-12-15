# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json from the Frontend directory
COPY Frontend/package.json Frontend/package-lock.json ./

# Install the dependencies using npm
RUN npm install

# Copy all files from the Frontend directory to the working directory
COPY Frontend/ .

# Expose the port your frontend app runs on (adjust if needed)
EXPOSE 3000

# Command to run the frontend application
CMD ["npm", "start"]
