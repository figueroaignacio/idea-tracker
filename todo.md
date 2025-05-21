# 🔐 N30 Vaults - Password & Credentials Manager

Sistema de gestión de contraseñas y credenciales personalizable, con autenticación por terceros y encriptación de datos sensibles.

---

## 📁 Estructura de carpetas – Screaming Architecture

```
/vaults-manager/
│
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── controllers/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── routes/
│   │   │   │   │   └── strategies/
│   │   │   │   ├── vaults/
│   │   │   │   ├── tables/
│   │   │   │   ├── columns/
│   │   │   │   ├── rows/
│   │   │   │   └── cells/
│   │   │   ├── db/
│   │   │   │   ├── schema.ts
│   │   │   │   └── index.ts
│   │   │   ├── middlewares/
│   │   │   ├── utils/
│   │   │   └── server.ts
│   │   └── .env
│   │   └── package.json
│
│   ├── frontend/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── features/
│   │   │   │   ├── auth/
│   │   │   │   ├── vaults/
│   │   │   │   ├── tables/
│   │   │   │   └── ui/
│   │   │   ├── stores/
│   │   │   ├── lib/
│   │   │   └── App.tsx
│   │   ├── vite.config.ts
│   │   └── package.json
│
├── docs/
│   └── todo.md
│
├── package.json
├── pnpm-workspace.yaml
---

## ✅ To-do list por funcionalidad

### 🔧 1. Inicialización del backend

- [ ] Crear proyecto con `ts-node`, `express`, `drizzle-orm`, `dotenv`
- [ ] Configurar base de datos PostgreSQL y conexión en `db/index.ts`
- [ ] Crear archivo `.env` para las variables necesarias

### 🔐 2. Autenticación OAuth2

- [ ] Configurar estrategias de `passport` para Google y GitHub
- [ ] Crear rutas: `/auth/google`, `/auth/github`, `/auth/callback`
- [ ] Guardar usuario si no existe en la DB
- [ ] Emitir JWT
- [ ] Middleware `authenticateJWT` para proteger rutas

### 🗃️ 3. Módulo Vaults

- [ ] `POST /vaults` — Crear una bóveda
- [ ] `GET /vaults` — Listar bóvedas del usuario
- [ ] `DELETE /vaults/:id` — Eliminar bóveda

### 📋 4. Módulo Tablas & Estructura Dinámica

- [ ] `POST /vaults/:id/tables` — Crear tabla en una bóveda
- [ ] `POST /tables/:id/columns` — Agregar columnas definidas por el usuario
- [ ] `POST /tables/:id/rows` — Agregar fila vacía
- [ ] `POST /rows/:id/cells` — Agregar datos a cada celda (campo)

### 🔒 5. Encriptación de datos

- [ ] Usar AES (con `crypto`) para cifrar campos como `cells.value`
- [ ] Guardar encriptado en DB, desencriptar solo para mostrar
- [ ] No guardar claves de encriptación en el frontend

### 🔁 6. Validaciones y seguridad

- [ ] Usar Zod para validar inputs en cada módulo
- [ ] Sanitizar entradas
- [ ] Implementar headers seguros y rate limiting

---

## 🎨 Frontend – Paso a paso

### 🚀 1. Setup

- [ ] Crear proyecto Vite con React, Tailwind, Zustand o React Query
- [ ] Estructurar con `/features`, `/components`, `/lib`, `/pages`

### 🔑 2. Login + Auth

- [ ] Página de login con botón "Iniciar con Google/GitHub"
- [ ] Al loguear: redirigir al backend, recibir JWT
- [ ] Guardar token en localStorage / context
- [ ] Middleware para proteger rutas

### 🧭 3. Navegación principal

- [ ] Dashboard con lista de bóvedas
- [ ] Al entrar a una bóveda: vista de tablas
- [ ] Tabla editable tipo Notion/Airtable

### ✏️ 4. Funcionalidades clave

- [ ] Crear nueva tabla
- [ ] Crear columnas personalizadas (nombre, tipo)
- [ ] Agregar filas
- [ ] Cargar datos en celdas (incluyendo campos secretos)
- [ ] Mostrar campos secretos como ocultos (revelar o copiar)

### 🎁 5. Mejoras UX

- [ ] Feedback al guardar/editar
- [ ] Loading states
- [ ] Dark mode
- [ ] Buscador
- [ ] Filtros por columna

---

## ☁️ Deploy

- [ ] Backend: Railway / Render
- [ ] Frontend: Vercel / Netlify
- [ ] Variables seguras `.env`
- [ ] HTTPS en ambos extremos

---

## 🔐 Seguridad

- No guardar contraseñas en texto plano
- Encriptación lado servidor
- No exponer secretos en el frontend
```
