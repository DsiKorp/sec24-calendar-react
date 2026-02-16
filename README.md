# Calendar App (React + TypeScript)

Aplicación de calendario construida con React, TypeScript y Redux Toolkit.

Este proyecto permite visualizar eventos en formato calendario, crear/editar eventos desde un modal, seleccionar eventos activos y eliminarlos desde una acción rápida.

> Estado actual: implementación **frontend local** (sin backend conectado todavía).

---

## 1) Objetivo del proyecto

Desarrollar una aplicación tipo agenda/calendario con una base sólida para:

- Gestión de eventos (CRUD).
- Flujo de autenticación (UI lista para login/registro).
- Escalabilidad hacia integración con API y persistencia real.
- Organización modular por dominios (`auth`, `calendar`, `store`, `hooks`, `helpers`).

---

## 2) Stack tecnológico

### Frontend

- **React 19**
- **TypeScript**
- **Vite**
- **React Router DOM 7**
- **Redux Toolkit + React Redux**

### Calendario y fechas

- **react-big-calendar**
- **date-fns**
- **react-datepicker**

### UI / UX

- **react-modal**
- **SweetAlert2**
- **Bootstrap 5** (vía CDN en `index.html`)
- **Font Awesome** (vía CDN en `index.html`)

---

## 3) Scripts disponibles

Desde la raíz del proyecto:

```bash
npm install
npm run dev
```

### Configuración de variables de entorno

Antes de ejecutar la app, crea tu archivo de entorno local renombrando:

- `.env.template` → `.env`

En Windows (PowerShell):

```powershell
Copy-Item .env.template .env
```

Luego completa en `.env` las variables necesarias para tu entorno.

Scripts definidos:

- `npm run dev`: levanta entorno de desarrollo con Vite.
- `npm run build`: compila TypeScript y genera build de producción.
- `npm run lint`: ejecuta ESLint.
- `npm run preview`: sirve localmente la build generada.

---

## 4) Estructura del proyecto

```text
src/
	auth/
		pages/LoginPage.tsx
	calendar/
		components/
			CalendarEventComponent.tsx
			CalendarModal.tsx
			FabAddNew.tsx
			FabDelete.tsx
			Navbar.tsx
		interfaces/CalendarEvent.tsx
		pages/CalendarPage.tsx
	helpers/
		calendarLocalizer.tsx
		getMessages.tsx
		getEnvVariables.ts
	hooks/
		useCalendarStore.tsx
		useUiStore.tsx
	router/
		AppRouter.tsx
	store/
		calendar/calendarSlice.tsx
		ui/uiSlice.tsx
		store.tsx
	CalendarApp.tsx
	main.tsx
	styles.css
```

---

## 5) Arquitectura y flujo

### 5.1 Entrada de la app

- `src/main.tsx` renderiza `CalendarApp` dentro de `#root`.
- `src/CalendarApp.tsx` envuelve la app con:
	- `Provider` de Redux (`store` global).
	- `BrowserRouter` para navegación.

### 5.2 Ruteo

- `src/router/AppRouter.tsx` decide entre:
	- `LoginPage` para ruta de auth.
	- `CalendarPage` para la app principal.

Actualmente `authStatus` está fijo en `'authenticated'`, por lo que la app muestra calendario por defecto.

### 5.3 Estado global (Redux)

Se manejan dos slices principales:

#### `calendarSlice`

- Estado:
	- `events`: arreglo de eventos.
	- `activeEvent`: evento seleccionado.
- Acciones:
	- `onSetActiveEvent`
	- `onAddNewEvent`
	- `onUpdateEvent`
	- `onDeleteEvent`

#### `uiSlice`

- Estado:
	- `isDateModalOpen`
- Acciones:
	- `onOpenDateModal`
	- `onCloseDateModal`

#### Hooks personalizados

- `useCalendarStore`: encapsula acceso/acciones de calendario.
- `useUiStore`: encapsula estado y acciones del modal.

---

## 6) Funcionalidades implementadas

### Calendario principal

- Vista mensual/semanal/diaria con `react-big-calendar`.
- Localización en español (`culture='es'`).
- Persistencia de la última vista en `localStorage` (`lastView`).

### Gestión de eventos

- Doble click en evento/slot abre modal para editar/crear.
- Click en evento lo marca como activo.
- Botón flotante `+` crea un borrador y abre modal.
- Botón flotante de eliminar aparece solo si hay evento activo y modal cerrado.

### Modal de evento

- Edición de:
	- Fecha/hora inicio
	- Fecha/hora fin
	- Título
	- Notas
- Validaciones:
	- Fin debe ser posterior a inicio.
	- Título obligatorio.
- Mensajes de error con SweetAlert2.

### Login UI

- Pantalla con tabs de **Ingreso** y **Registro**.
- Estilo visual con animaciones (glassmorphism + gradientes).
- Por ahora solo interfaz (sin lógica real de autenticación).

---

## 7) Localización y utilidades

- `helpers/calendarLocalizer.tsx`: configura `dateFnsLocalizer`.
- `helpers/getMessages.tsx`: textos del calendario en español.
- `helpers/getEnvVariables.ts`: helper para exponer `import.meta.env`.

---

## 8) Estado actual del desarrollo

La aplicación está enfocada en frontend y flujo local de eventos.

### Lo que ya funciona

- Render y navegación base.
- Estado global con Redux Toolkit.
- Alta/edición/eliminación de eventos en memoria.
- Modal con validaciones.
- UI de autenticación.

### Pendiente (próximos pasos)

- Integrar backend para persistencia real de eventos.
- Reemplazar datos temporales por datos de API.
- Implementar autenticación real (login/registro/logout).
- Proteger rutas según sesión.
- Manejar carga/errores asíncronos en store.
- Agregar pruebas unitarias/integración.

---

## 9) Consideraciones técnicas importantes

- En `store/store.tsx` se desactiva `serializableCheck` para evitar advertencias de Redux por objetos `Date` en el estado.
- Bootstrap y Font Awesome se cargan por CDN desde `index.html`.
- El proyecto usa Vite + TypeScript con configuración ESLint moderna (`eslint.config.js`).

---

## 10) Comandos recomendados para desarrollo

```bash
# Instalar dependencias
npm install

# Levantar en desarrollo
npm run dev

# Validar lint
npm run lint

# Generar build
npm run build

# Probar build local
npm run preview
```

---

## 11) Roadmap sugerido

1. Crear capa de servicios HTTP (por ejemplo `src/api`).
2. Conectar `useCalendarStore` con endpoints reales (crear/actualizar/eliminar/listar).
3. Incorporar `authSlice` y token/session handling.
4. Implementar rutas públicas/privadas en `AppRouter`.
5. Añadir testing con Vitest + React Testing Library.

---

## 12) Autor y contexto

Proyecto de práctica/entrenamiento para consolidar:

- React con arquitectura por features.
- Redux Toolkit en un caso real.
- Manejo de fechas, modales y UI interactiva.

Si quieres, puedo dejar en el siguiente paso una versión del README con badges, capturas y una sección de "API Contract" para acelerar la integración con backend.
