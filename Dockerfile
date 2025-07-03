# 1단계: 빌드 단계
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 2단계: 실행 단계 (경량화)
FROM node:20-alpine AS runner

WORKDIR /app

# 빌드된 산출물만 복사
COPY --from=builder /app/.env .env
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
# 필요시 추가: tsconfig.json, app/, pages/ 등

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
