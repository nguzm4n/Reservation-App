# Usamos una imagen de Node.js oficial
FROM node:18

# Creamos y configuramos el directorio de la aplicación en el contenedor
WORKDIR /app

# Copiamos el package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos todo el código a /app en el contenedor
COPY . .

# Compilamos el código TypeScript
RUN npm run build

# Exponemos el puerto
EXPOSE 3000

# Iniciamos la aplicación
CMD ["npm", "run", "start"]