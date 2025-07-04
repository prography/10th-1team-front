# 1단계: 빌드 단계
FROM node:20 AS builder

WORKDIR /app

# 모든 파일 복사
COPY . .

# 의존성 설치 및 빌드
RUN npm ci
RUN npm run build

# 2단계: 실행 단계 (경량화)
FROM node:20-alpine AS runner

WORKDIR /app

# 모든 파일 복사
COPY --from=builder /app ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
