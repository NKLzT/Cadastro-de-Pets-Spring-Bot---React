FROM node:18.17.0
WORKDIR ./react-app/my-app
ENV PATH ./react-app/my-app/node_modules/.bin:$PATH
COPY my-app/package.json ./package.json
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY my-app .
RUN npm run build
CMD ["npm", "start"]