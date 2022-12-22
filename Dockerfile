FROM node:16-alpine AS BUILD_IMAGE
RUN mkdir -p /usr/app/
WORKDIR /usr/app/
COPY ./ ./
RUN npm install --force
RUN npm run build
RUN rm -rf node_modules
RUN npm install --production --force


FROM node:16-alpine 
ENV NODE_ENV production
RUN mkdir -p /usr/app/
WORKDIR /usr/app
COPY --from=BUILD_IMAGE /usr/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/app/package.json ./
COPY --from=BUILD_IMAGE /usr/app/package-lock.json ./
COPY --from=BUILD_IMAGE /usr/app/public ./public
COPY --from=BUILD_IMAGE /usr/app/.next ./.next
EXPOSE 3000
CMD [ "npm", "start" ]

# refrence video
# https://youtu.be/fc2ogKwYnTs