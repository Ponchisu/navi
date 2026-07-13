FROM node:24-alpine AS builder

RUN corepack enable && corepack prepare pnpm@11.1.1 --activate

WORKDIR /app

COPY package.json .

COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN chown -R node:node /app

USER node

RUN pnpm run build

FROM node:24-alpine AS runner

RUN corepack enable && corepack prepare pnpm@11.1.1 --activate

WORKDIR /app

#ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/package.json ./package.json

RUN chown -R node:node /app

USER node

CMD ["pnpm", "run", "start"]