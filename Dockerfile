# Use an official Python runtime as a parent image
FROM node:10.15.1-jessie-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./dist /app/dist
COPY ./package.json /app/

# Run npm install 
RUN npm install

RUN node --version
RUN npm --version

# Make port 80 available to the world outside this container
EXPOSE 3000

# Run app.py when the container launches
CMD ["node", "dist/express-server"]