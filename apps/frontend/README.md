# AulaSegura - Dashboard Admin

Dashboard web de administración para la aplicación AulaSegura, desarrollado con React Native Web y orientado exclusivamente para administradores.

## 📋 Descripción

Panel de administración de AulaSegura. Permite gestionar el acceso a aulas y espacios mediante QR, NFC y RFID: usuarios, cursos, departamentos, asignaturas, reservas, permisos y supervisión en tiempo real.

**Importante:** Esta aplicación está destinada exclusivamente para **web/escritorio** y uso del **rol administrador**.

## 🎯 Objetivo

Proporcionar una interfaz web para que los administradores puedan:
- Gestionar usuarios (administradores, profesores, conserjes, staff de soporte)
- Administrar contenido académico (cursos, departamentos, asignaturas)
- Gestionar espacios, credenciales y permisos de acceso
- Supervisar reportes, incidencias y actividad del sistema
- Configurar parámetros globales de la plataforma

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React Native + Expo | 0.81.5 / ~54.0.29 | Base de la aplicación |
| React Native Web | ^0.21.0 | Renderizado en navegador |
| Expo Router | ~6.0.19 | Routing file-based con historial |
| React Native Paper | ^5.14.5 | Componentes Material Design 3 |
| TanStack Query | ^5.90.20 | Caché y sincronización de datos del servidor |
| Axios | ^1.13.2 | Cliente HTTP con interceptores |
| React Hook Form | ^7.71.1 | Gestión de formularios |
| Zod | ^3.23.8 | Validación de esquemas |
| expo-secure-store | ^15.0.8 | Almacenamiento seguro de tokens |
| react-native-paper-dates | ^0.23.3 | Selector de fechas MD3 |
| react-native-reanimated-carousel | ^4.0.3 | Carrusel de avatares |
| @expo-google-fonts/roboto | ^0.4.2 | Tipografía Roboto |
| victory-native | ^41.20.2 | Gráficas (previsto para analíticas) |
| TypeScript | ~5.9.2 | Tipado estático |

## 🎨 Diseño

- **Sistema de diseño**: Material Design 3
- **Tema**: colores corporativos de AulaSegura
  - Primary: `#182D73` · Secondary: `#306AC6` · Tertiary: `#3B82F6`
- **Tipografía**: Roboto (400, 500, 700)
- **Hook tipado**: `useAppTheme()` para acceso al tema con autocompletado

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── _layout.tsx              # Root layout: providers globales
│   ├── index.tsx                # Redirección inicial
│   ├── (auth)/
│   │   └── login.tsx            # Pantalla de login
│   └── (app)/
│       ├── _layout.tsx          # Layout app: Sidebar + Topbar + FilterProvider
│       ├── home.tsx             # Dashboard
│       ├── users/               # Gestión de usuarios
│       ├── academic/            # Cursos, departamentos, asignaturas
│       ├── spaces/              # Aulas, lectores, plano
│       ├── access/              # Permisos, reservas, validaciones
│       ├── credentials/         # RFID, NFC
│       ├── supervision/         # Analíticas, incidencias, logs
│       ├── notifications/       # Notificaciones
│       └── settings/            # Configuración
├── components/                  # Componentes reutilizables
├── contexts/                    # FilterContext, AuthContext
├── hooks/
│   ├── usePaginationParams.ts   # Paginación sincronizada con URL
│   └── queries/                 # Hooks TanStack Query por entidad
├── services/                    # Servicios API
├── schemas/                     # Schemas Zod
├── types/                       # Tipos TypeScript
├── utils/                       # colorUtils, roleUtils
├── constants.ts
└── theme.ts
```

## 🚀 Instalación

### Requisitos previos
- Node.js >= 18
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd frontend_reactnative_aulasegura

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con las URLs de tu entorno

# 4. Iniciar en modo web
npm run web
```

## 📱 Scripts Disponibles

```bash
npm run web          # Servidor de desarrollo (web)
npm run build:web    # Genera bundle de producción en /dist
npm start            # Servidor de desarrollo (Expo)
npm run android      # Android (futuro)
npm run ios          # iOS (futuro)
```

### Variables de entorno

Se adjunta `.env.example` con todas las variables necesarias:

| Variable | Descripción | Ejemplo |
|---|---|---|
| `EXPO_PUBLIC_NESTJS_API_URL` | URL de la API REST (NestJS) | `http://localhost:8000` |
| `EXPO_PUBLIC_IMAGE_SERVER_URL` | URL del servidor de imágenes | `http://localhost:8090` |

> ⚠️ Las variables `EXPO_PUBLIC_*` se incrustan en el bundle en tiempo de **build**, no en tiempo de ejecución. Deben estar disponibles al construir la imagen Docker.

## 🐳 Docker (desarrollo)

Levanta el servidor de desarrollo de Expo con hot reload. El código fuente se monta como volumen, por lo que los cambios se reflejan en tiempo real sin reconstruir la imagen.

```bash
# Primera vez (construye la imagen con las dependencias)
docker-compose up --build

# Siguientes veces
docker-compose up
```

La app queda disponible en `http://localhost:8081`.

> Las variables de entorno se leen automáticamente desde el `.env` local.

## 🔐 Funcionalidades Implementadas

### Autenticación
- ✅ Login con React Hook Form + Zod
  - Validación de formato de email
  - Validación de contraseña (mín. 8 caracteres, mayúscula, minúscula, número)
  - Feedback visual de errores
  - Toggle de visibilidad de contraseña
- ✅ `AuthContext` + `tokenService` con interceptores axios
- ✅ Redirección automática según estado de sesión

### Tema
- ✅ Sistema de theming personalizado con MD3
- ✅ Todas las variantes tipográficas customizadas
- ✅ Colores corporativos integrados (`darkGrey`, `grey`, `success`, `warning`…)
- ✅ Hook `useAppTheme()` para acceso tipado al tema

### Layout Principal
- ✅ **Sidebar** colapsable, colapso automático < 1280px
- ✅ **Topbar** con menú de perfil, notificaciones y búsqueda
- ✅ Layout responsive para pantallas pequeñas

### Sistema de Filtros Global
- ✅ **`FilterContext`**: estado persistente de filtros sincronizado con URL (`?filters=valor1,valor2`)
- ✅ Se limpia automáticamente al navegar entre secciones
- ✅ Se restaura al recargar la página
- ✅ Commas no codificadas (`%2C`) — URL legible por humanos
- ✅ **`GlobalSearch`**: barra de búsqueda con chips (pantallas grandes)
- ✅ **`SearchMenu`**: variante menú para pantallas pequeñas
- ✅ Botón limpiar todos los filtros con efecto hover

### Paginación Sincronizada con URL
- ✅ **`usePaginationParams`**: hook por pantalla que sincroniza `page` y `limit` con la URL
- ✅ Persiste al recargar, no hereda valores de otras pantallas
- ✅ Resetea a página 1 cuando cambian los filtros

### Dashboard (Home)
- ✅ **KPIs**: Reservas de hoy, Incidencias abiertas, Usuarios activos (dato real del backend), Espacios activos
- ✅ **Widgets**: Reservas del día, Últimos accesos denegados
- ✅ **Acciones rápidas**: accesos directos a las secciones principales
- ✅ Responsive (botones adaptativos en pantallas pequeñas)

### Gestión de Usuarios
- ✅ Listado con **DataTable** paginado, ordenable y filtrable
- ✅ Crear usuario (formulario con roles, departamento, avatar, validez)
- ✅ Editar usuario
- ✅ Eliminar usuario con diálogo de confirmación
- ✅ Avatar desde servidor de imágenes
- ✅ Chips de rol con colores diferenciados
- ✅ Tooltips en celdas truncadas

### Gestión Académica
- ✅ **Cursos**: listado, crear, editar, activar/desactivar
- ✅ **Departamentos**: listado expandible con asignaturas, activar/desactivar
- ✅ **Asignaturas**: listado expandible con cursos, activar/desactivar
- ✅ Todos con filtros + paginación URL sync

### Secciones en desarrollo (placeholder)
- 🔄 Espacios: Aulas, Lectores, Plano del centro
- 🔄 Acceso: Permisos, Reservas, Validaciones
- 🔄 Credenciales: RFID, NFC
- 🔄 Supervisión: Analíticas, Incidencias, Logs
- 🔄 Notificaciones
- 🔄 Configuración del sistema

## 🧩 Componentes Principales

### Datos
| Componente | Descripción |
|---|---|
| `DataTable` | Tabla con FlatList, ordenación por columna, paginación y scroll virtual |
| `KPICard` | Tarjeta de indicador con icono, valor y badge opcional |
| `WidgetCard` | Card con título y acción |
| `StyledChip` | Chip con color, hover en icono X y ripple |
| `TooltipWrapper` | Tooltip via Portal + `position: fixed` (inmune a overflow clipping) |

### Formularios
| Componente | Descripción |
|---|---|
| `FormTextInput` | Input controlado con React Hook Form |
| `FormCheckbox` | Checkbox controlado |
| `FormDatePicker` | Selector de fecha |
| `FormSegmentedButtons` | Botones segmentados |
| `FormMultiSelect` | Selector múltiple con chips |
| `FormSingleSelect` | Selector único |
| `AvatarPicker` | Selector de avatar con galería |
| `UserForm` | Formulario completo de usuario |
| `CourseForm` | Formulario de curso |
| `SubjectForm` | Formulario de asignatura |

### UI / Feedback
| Componente | Descripción |
|---|---|
| `StyledCard` | Card MD3 con estilos consistentes |
| `StyledSnackbar` | Snackbar con Portal opcional |
| `ConfirmDialog` | Diálogo de confirmación reutilizable |
| `Tabs` | Barra de pestañas con routing real en historial, responsive |
| `Sidebar` | Navegación lateral colapsable |
| `Topbar` | Barra superior con búsqueda y menús |
| `ProfileMenu` | Menú desplegable de perfil |
| `NotificationMenu` | Menú de notificaciones |

## 🔄 Integración con Backend

- **Base URL**: configurable en `src/constants.ts`
- **TanStack Query**: caché por entidad, `staleTime` por tipo de dato, invalidación automática tras mutaciones
- **Filtros híbridos**: `filters=juan,rol:admin,email:@gmail.com` — el backend interpreta campos específicos con `campo:valor` y búsqueda libre sin prefijo
- **Paginación**: parámetros `page` y `limit` en query string, respuesta con `data[]` + `meta` (total, pages, etc.)
