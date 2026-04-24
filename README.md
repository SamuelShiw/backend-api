# 🚀 Backend API - Node.js + MySQL + JWT + Docker

## 📌 Descripción

Este proyecto consiste en el desarrollo de una API REST utilizando Node.js y Express, conectada a una base de datos MySQL en la nube, con implementación de autenticación mediante JWT y protección de rutas.

El sistema permite la gestión de ítems mediante operaciones CRUD, garantizando que solo usuarios autenticados puedan acceder a los recursos.

---

## 🧱 Arquitectura

El proyecto está estructurado en módulos:


src/
│
├── config/ # Conexión a base de datos
├── controllers/ # Lógica de negocio
├── middleware/ # Autenticación (JWT)
├── routes/ # Definición de endpoints
└── server.js # Punto de entrada


---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- MySQL (Aiven - base de datos en la nube)
- JSON Web Token (JWT)
- Docker
- Git y GitHub

---

## ⚙️ Configuración del entorno

Crear archivo `.env`:


PORT=3000

DB_HOST=TU_HOST
DB_USER=TU_USUARIO
DB_PASSWORD=TU_PASSWORD
DB_NAME=TU_DB
DB_PORT=TU_PUERTO

JWT_SECRET=clave_secreta


---

## ▶️ Ejecución del proyecto

### Modo desarrollo

```bash
npm install
npm run dev
Modo producción
npm start
🐳 Ejecución con Docker
docker build -t backend-api .
docker run -p 3000:3000 --env-file .env backend-api
🔐 Autenticación

El sistema utiliza JWT para proteger las rutas.

Flujo:

Registrar usuario (/register)
Iniciar sesión (/login)
Obtener token
Enviar token en cada request protegido:
Authorization: Bearer TOKEN
📡 Endpoints
🔑 Autenticación
POST /register → Registrar usuario
POST /login → Iniciar sesión
📦 CRUD de Items (requiere autenticación)
GET /api/items → Listar items
GET /api/items/:id → Obtener item por ID
POST /api/items → Crear item
PUT /api/items/:id → Actualizar item
DELETE /api/items/:id → Eliminar item
🧪 Pruebas por consola

Ejemplo con PowerShell:

Invoke-RestMethod -Method GET `
-Uri "http://localhost:3000/api/items" `
-Headers @{ Authorization = "Bearer TOKEN" }
📊 Base de datos

Tabla items:

id INT AUTO_INCREMENT PRIMARY KEY
nombre VARCHAR(100)
descripcion TEXT
estado BOOLEAN
created_at TIMESTAMP

Tabla users:

id INT AUTO_INCREMENT PRIMARY KEY
username VARCHAR(100)
password VARCHAR(255)
created_at TIMESTAMP
📌 Reglas de negocio
Un usuario debe registrarse antes de acceder al sistema.
Un usuario debe autenticarse para obtener un token.
Solo usuarios autenticados pueden acceder al CRUD.
Cada item debe contener nombre, descripción y estado.
Los datos se almacenan en una base de datos remota.
⚠️ Validaciones implementadas
Validación de campos en registro (username y password obligatorios).
Validación de credenciales en login.
Verificación de token en rutas protegidas.
Manejo de errores en base de datos.
📁 Control de versiones

El proyecto utiliza Git con el siguiente flujo:

main → rama estable
feature/items-crud → desarrollo del CRUD
📸 Evidencias
Registro de usuario
Login con token
CRUD funcionando
Conexión a base de datos remota
Ejecución en Docker
Pruebas por consola
🧠 Conclusión

Se logró implementar una API REST completa, segura y desplegable, aplicando buenas prácticas de desarrollo backend, autenticación, conexión a servicios externos y contenerización.