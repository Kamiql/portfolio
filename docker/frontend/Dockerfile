FROM node:18

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend .

ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build

CMD ["npm", "run", "dev", "--", "--host"]