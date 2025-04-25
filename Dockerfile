# Build stage
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20

WORKDIR /app
COPY --from=builder /app .
RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]