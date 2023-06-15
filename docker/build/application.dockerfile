FROM node:19.6-alpine3.17 as dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@^8.6.0 \
  && pnpm install



FROM dependencies as build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build \
  && pnpm prune --prod



FROM node:19.6-alpine3.17

WORKDIR /app
COPY --from=build /app/dist ./ 
COPY --from=build /app/node_modules /node_modules

CMD [ "node", "src/main.js" ]
