# Node.js base image
FROM node:18-alpine

# Working directory set karo
WORKDIR /app

# Backend files copy karo
COPY backend/package*.json ./

# Dependencies install karo
RUN npm install

# Baaki saara code copy karo
COPY . .

# Port expose karo
EXPOSE 3000

# App start karo
CMD ["node", "backend/app.js"]