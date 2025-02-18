# FROM node:20 as build

# WORKDIR /app
# COPY package*json .
# RUN npm install
# COPY . .
# # Copy .env file
# COPY .env .env
# RUN npm run build

# FROM node:20 
# WORKDIR /app
# COPY package*json .
# RUN npm install 
# COPY .env /app
# COPY --from=build /app/dist ./dist
# CMD ["npm", "run", "start"]



FROM node:20 

# WORKDIR /usr/src/app
WORKDIR /app
COPY package*json ./
RUN npm install --production
COPY . .

EXPOSE 3000

# ENV PORT_API=3000
ENV PORT=3000
ENV DATABASE_HOST="angular.cn0k4g66whi2.us-east-1.rds.amazonaws.com"
ENV DATABASE_PORT=5432
ENV DATABASE_USER="postgres"
ENV DATABASE_PASS="Angular.4857"
ENV DATABASE_NAME="Angular"
ENV CLOUDINARY_NAME="dumrfrhpj"
# ENV CLOUDINARY_API_KEY=563368826192122
# ENV CLOUDINARY_API_SECRET=ZJUT5VflU49EaBPGzB52bTLc2bU


CMD ["npm", "run", "start:prod"]