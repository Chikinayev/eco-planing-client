# Загрузка базового образа Node.js
FROM node:14

# Установка зависимостей
WORKDIR /app
COPY package*.json ./
RUN npm install

# Копирование исходного кода
COPY . .

# Сборка приложения Angular
RUN npm run build -- --prod

# Указание команды для запуска сервера Angular
CMD ["npm", "start"]
