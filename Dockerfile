# 1. Imagen base con Node.js
FROM node:18-alpine

# 2. Directorio de trabajo
WORKDIR /app

# 3. Copiar package.json y lock para instalar dependencias
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar el resto del proyecto
COPY . .

# 6. Compilar TypeScript
RUN npm run build

# 7. Exponer puerto
EXPOSE 3000

# 9. Comando para correr la app en prod
CMD ["npm", "run", "start:prod"]
