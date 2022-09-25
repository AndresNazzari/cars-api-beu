FROM node:18

# Create app directory, this is in our container/in our image
WORKDIR /ajn/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#Install dependencies
RUN npm install 


# Bundle app source
COPY . .

RUN npm run build

# Run migrations to postgress
# RUN npm run migration:run

EXPOSE 3000
CMD [ "node", "dist/src/main" ]