# Portfolio Frontend 🌟

Un portfolio personal moderno y responsivo construido con React, TypeScript, y Tailwind CSS. Diseñado para ser completamente dinámico con integración de API backend.

## ✨ Características

- **🚀 Rendimiento Optimizado**: Construido con Vite para desarrollo rápido y builds eficientes
- **🎨 Diseño Moderno**: Interfaz limpia y profesional con Tailwind CSS
- **📱 Completamente Responsivo**: Adaptable a todos los tamaños de pantalla
- **🌍 Multiidioma**: Soporte completo para español e inglés con react-i18next
- **🔥 Animaciones Fluidas**: Transiciones suaves con Framer Motion
- **🔌 Integración API**: Contenido completamente dinámico desde backend
- **♿ Accesible**: Componentes diseñados siguiendo estándares de accesibilidad
- **🎯 SEO Optimizado**: Meta tags dinámicos y estructura semántica
- **📊 Iconos Dinámicos**: Sistema flexible de iconos con Lucide React
- **🌙 Modo Oscuro**: Soporte completo para tema oscuro/claro

## 🛠️ Stack Tecnológico

### Frontend Core
- **React 18.3.1** - Biblioteca de UI con hooks modernos
- **TypeScript** - Tipado estático para mejor desarrollo
- **Vite** - Build tool rápido y moderno
- **Tailwind CSS** - Framework de CSS utility-first

### UI & UX
- **Radix UI** - Componentes primitivos accesibles
- **Framer Motion** - Animaciones y transiciones
- **Lucide React** - Sistema de iconos consistente
- **Sonner** - Notificaciones elegantes

### Internacionalización
- **react-i18next** - Sistema completo de traducciones
- **i18next-browser-languagedetector** - Detección automática de idioma

### Estado y Datos
- **React Context** - Gestión de estado global optimizada
- **Custom Hooks** - Lógica reutilizable para API calls
- **TanStack Query** - Cache y sincronización de datos del servidor

### Desarrollo y Calidad
- **ESLint** - Linting de código
- **Vitest** - Testing unitario
- **TypeScript** - Verificación de tipos
- **Docker** - Containerización para deployment

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes base reutilizables
│   ├── sections/       # Secciones principales del portfolio
│   └── animations/     # Componentes de animación
├── hooks/              # Custom hooks
├── contexts/           # Contextos de React
├── services/           # Servicios de API
├── types/              # Definiciones de TypeScript
├── utils/              # Funciones utilitarias
├── i18n/               # Configuración de internacionalización
├── config/             # Configuraciones
└── lib/                # Utilidades de librerías
```

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd portfolio-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Editar `.env` con tus valores:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_ENVIRONMENT=development
   VITE_APP_NAME=Portfolio
   VITE_APP_VERSION=1.0.0
   ```

4. **Iniciar desarrollo**
   ```bash
   npm run dev
   ```

   El servidor estará disponible en `http://localhost:3000`

## 📡 Integración con API

### Endpoints Utilizados

El frontend consume los siguientes endpoints del backend:

- `GET /api/v1/site-config/` - Configuración general del sitio
- `GET /api/v1/about/` - Información personal y biografía  
- `GET /api/v1/skills/` - Habilidades organizadas por categorías
- `GET /api/v1/projects/` - Portafolio de proyectos
- `GET /api/v1/experience/` - Experiencia laboral
- `GET /api/v1/education/` - Educación académica
- `GET /api/v1/contact/` - Información de contacto y redes sociales

### Formato de Datos

Todos los endpoints devuelven datos en formato JSON. Las imágenes y documentos se proporcionan en formato base64 a través del campo `*_data`.

Ejemplo de respuesta de proyecto:
```json
{
  "id": 1,
  "title_en": "Portfolio Website",
  "title_es": "Sitio Web Portfolio",
  "description_en": "Modern portfolio built with React",
  "description_es": "Portfolio moderno construido con React",
  "image_data": {
    "data": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "mime_type": "image/jpeg",
    "size": 245760,
    "filename": "project1.jpg"
  },
  "technologies": ["React", "TypeScript", "Tailwind"],
  "source_url": "https://github.com/user/project",
  "demo_url": "https://project-demo.com"
}
```

## 🏗️ Comandos Disponibles

### Desarrollo
```bash
npm run dev          # Servidor de desarrollo
npm run preview      # Preview de build de producción
```

### Build y Testing
```bash
npm run build        # Build para producción
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run coverage     # Generar reporte de cobertura
```

### Código y Calidad
```bash
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Arreglar errores de lint automáticamente
```

### Docker
```bash
npm run docker:dev   # Ejecutar en desarrollo con Docker
npm run docker:build # Construir imagen de producción
npm run docker:prod  # Ejecutar producción con Docker
```

## 🐳 Deployment con Docker

### Desarrollo
```bash
docker-compose up portfolio-dev
```

### Producción
```bash
# Build
docker-compose build portfolio-frontend

# Run
docker-compose up portfolio-frontend
```

### Coolify Deployment
El proyecto incluye un `Dockerfile` optimizado para Coolify con las siguientes características:
- Build multi-stage para imagen ligera
- Nginx como servidor web
- Configuración de seguridad optimizada
- Health checks integrados
- Usuario no-root para seguridad

## 🌍 Internacionalización

El proyecto soporta múltiples idiomas con detección automática:

### Idiomas Disponibles
- 🇪🇸 **Español** (es)
- 🇺🇸 **Inglés** (en)

### Archivos de Traducción
```
src/i18n/locales/
├── es/
│   ├── common.json
│   ├── navigation.json
│   ├── hero.json
│   ├── about.json
│   ├── skills.json
│   ├── projects.json
│   ├── experience.json
│   ├── education.json
│   └── contact.json
└── en/
    └── [mismos archivos]
```

### Uso en Componentes
```tsx
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation('namespace');
  
  return <h1>{t('title')}</h1>;
};
```

## 🎨 Componentes UI

### Biblioteca de Componentes
- **Button**: Botones con múltiples variantes
- **Card**: Contenedores de contenido
- **Badge**: Etiquetas y tags
- **Input/Textarea**: Campos de formulario
- **Tabs**: Navegación por pestañas
- **Toast**: Notificaciones

### Animaciones
- **FadeInWhenVisible**: Aparece al entrar en viewport
- **StaggerContainer/StaggerItem**: Animaciones secuenciales
- **ScaleOnHover**: Escalado en hover
- **TypewriterText**: Efecto de máquina de escribir
- **FloatingIcon**: Iconos flotantes animados

## 🔧 Configuración

### Variables de Entorno
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Environment
VITE_ENVIRONMENT=development|production

# App Information
VITE_APP_NAME=Portfolio
VITE_APP_VERSION=1.0.0
```

### Configuración de API
```typescript
// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:8000'),
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  ENDPOINTS: { /* ... */ }
};
```

## 🧪 Testing

### Ejecutar Tests
```bash
# Tests únicos
npm run test

# Watch mode
npm run test:watch

# Con cobertura
npm run coverage
```

### Estructura de Tests
- **Utils**: Tests para funciones utilitarias
- **Components**: Tests de componentes (configurado pero opcional)
- **Hooks**: Tests de custom hooks (configurado pero opcional)

### Coverage Goals
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

## 🚀 CI/CD Pipeline

### GitHub Actions
El proyecto incluye un pipeline completo con:

1. **Install**: Instalación de dependencias con cache
2. **Lint**: Verificación de calidad de código
3. **Build**: Construcción de la aplicación
4. **Security**: Auditoría de seguridad
5. **Test**: Ejecución de tests (cuando existan)
6. **Deploy**: Deployment automático en main branch

### Workflow Triggers
- **Push** a `main` y `develop`
- **Pull Request** hacia `main`

## 🔒 Seguridad

### Medidas Implementadas
- **Headers de Seguridad**: CSP, X-Frame-Options, etc.
- **Auditoría de Dependencias**: npm audit en CI/CD
- **Análisis de Código**: njsscan para vulnerabilidades
- **Variables de Entorno**: Configuración segura sin hardcoding
- **Usuario No-Root**: Container ejecuta con usuario limitado

## 📊 Rendimiento

### Optimizaciones
- **Code Splitting**: Carga bajo demanda
- **Tree Shaking**: Eliminación de código no usado
- **Lazy Loading**: Carga diferida de componentes
- **Image Optimization**: Soporte para base64 y formatos optimizados
- **Caching**: Estrategias de cache para assets estáticos

### Métricas de Build
- **Bundle Size**: ~1.3MB (minificado)
- **Gzip Size**: ~314KB
- **Build Time**: ~2.5s

## 🤝 Contribución

### Guías de Desarrollo
1. Seguir las convenciones de TypeScript
2. Usar ESLint para mantener consistencia
3. Escribir tests para nuevas funcionalidades críticas
4. Documentar cambios significativos
5. Mantener responsive design en todas las vistas

### Proceso de PR
1. Fork del repositorio
2. Crear branch feature/descripcion
3. Desarrollar con tests apropiados
4. Ejecutar `npm run lint` y `npm run build`
5. Crear Pull Request con descripción detallada

## 📞 Soporte

Para problemas o preguntas:
1. Revisar la documentación
2. Buscar en issues existentes
3. Crear un nuevo issue con detalles completos

## 📄 Licencia

Este proyecto es privado. Todos los derechos reservados.

---

**Construido con ❤️ usando React + TypeScript + Tailwind CSS**