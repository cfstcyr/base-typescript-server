FROM node:18 as dev
WORKDIR /app
EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV development
CMD ["npm", "run", "dev"]

FROM node:18 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:18-slim as prod
WORKDIR /usr/src/app
RUN chown node:node ./
USER node
COPY package.json package-lock.json ./
EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV production
RUN npm ci --production && npm cache clean --force
COPY --from=builder /app/dist dist
CMD ["npm", "start"]