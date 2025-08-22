# Portfolio Frontend 🌟

A modern and responsive personal portfolio built with React, TypeScript, and Tailwind CSS. Designed to be fully dynamic with backend API integration.

## ✨ Features

- **🚀 Performance Optimized**: Built with Vite for fast development and efficient builds
- **🎨 Modern Design**: Clean and professional interface with Tailwind CSS
- **📱 Fully Responsive**: Adaptable to all screen sizes and devices
- **🌍 Multilingual**: Complete support for Spanish and English with react-i18next
- **🔥 Smooth Animations**: Fluid transitions with Framer Motion
- **🔌 API Integration**: Fully dynamic content from backend API
- **♿ Accessible**: Components designed following accessibility standards
- **🎯 SEO Optimized**: Dynamic meta tags and semantic structure
- **📊 Dynamic Icons**: Flexible icon system with Lucide React
- **🌙 Dark Mode**: Complete dark/light theme support

## 🛠️ Technology Stack

### Frontend Core
- **React 18.3.1** - UI library with modern hooks
- **TypeScript** - Static typing for better development
- **Vite** - Fast and modern build tool
- **Tailwind CSS** - Utility-first CSS framework

### UI & UX
- **Radix UI** - Accessible primitive components
- **Framer Motion** - Animations and transitions
- **Lucide React** - Consistent icon system
- **Sonner** - Elegant notifications

### Internationalization
- **react-i18next** - Complete translation system
- **i18next-browser-languagedetector** - Automatic language detection

### State and Data
- **React Context** - Optimized global state management
- **Custom Hooks** - Reusable logic for API calls
- **TanStack Query** - Server data cache and synchronization

### Development and Quality
- **ESLint** - Code linting
- **Vitest** - Unit testing
- **TypeScript** - Type checking
- **Docker** - Containerization for deployment

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable base components
│   ├── sections/       # Main portfolio sections
│   └── animations/     # Animation components
├── hooks/              # Custom hooks
├── contexts/           # React contexts
├── services/           # API services
├── types/              # TypeScript definitions
├── utils/              # Utility functions
├── i18n/               # Internationalization config
├── config/             # Configurations
└── lib/                # Library utilities
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mikebgdev/portfolio-frontend.git
   cd portfolio-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your values:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_ENVIRONMENT=development
   VITE_APP_NAME=Portfolio
   VITE_APP_VERSION=1.0.0
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Server will be available at `http://localhost:8080`

## 📡 API Integration

### Required Endpoints

The frontend consumes the following backend endpoints:

- `GET /api/v1/site-config/` - General site configuration
- `GET /api/v1/about/` - Personal information and biography  
- `GET /api/v1/skills/` - Skills organized by categories
- `GET /api/v1/projects/` - Project portfolio
- `GET /api/v1/experience/` - Work experience
- `GET /api/v1/education/` - Academic education
- `GET /api/v1/contact/` - Contact information and social networks

### Data Format

All endpoints return data in JSON format. Images and documents are provided in base64 format through the `*_data` field.

Example project response:
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

## 🏗️ Available Commands

### Development
```bash
npm run dev          # Development server
npm run preview      # Preview production build
```

### Build and Testing
```bash
npm run build        # Production build
npm run test         # Run tests
npm run test:watch   # Tests in watch mode
npm run coverage     # Generate coverage report
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
```

## 🐳 Docker Deployment

### Production Build
```bash
# Build the image
docker build -t portfolio-frontend .

# Run the container
docker run -p 8080:8080 \
  -e VITE_API_BASE_URL=https://your-api.com \
  portfolio-frontend
```

### Coolify Deployment
The project includes an optimized `Dockerfile` for Coolify with:
- Multi-stage build for lightweight images
- Nginx as web server
- Optimized security configuration
- Integrated health checks
- Non-root user for security

## 🌍 Internationalization

The project supports multiple languages with automatic detection:

### Available Languages
- 🇪🇸 **Spanish** (es)
- 🇺🇸 **English** (en)

### Translation Files
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
    └── [same files]
```

### Usage in Components
```tsx
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation('namespace');
  
  return <h1>{t('title')}</h1>;
};
```

## 🎨 UI Components

### Component Library
- **Button**: Buttons with multiple variants
- **Card**: Content containers
- **Badge**: Labels and tags
- **Input/Textarea**: Form fields
- **Tabs**: Tab navigation
- **Toast**: Notifications

### Animations
- **FadeInWhenVisible**: Appears when entering viewport
- **StaggerContainer/StaggerItem**: Sequential animations
- **ScaleOnHover**: Scale on hover
- **TypewriterText**: Typewriter effect
- **FloatingIcon**: Animated floating icons

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Environment
VITE_ENVIRONMENT=development|production

# App Information
VITE_APP_NAME=Portfolio
VITE_APP_VERSION=1.0.0
```

### API Configuration
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

### Running Tests
```bash
# Single run
npm run test

# Watch mode
npm run test:watch

# With coverage
npm run coverage
```

### Test Structure
- **Utils**: Tests for utility functions
- **Components**: Component tests (configured but optional)
- **Hooks**: Custom hooks tests (configured but optional)

### Coverage Goals
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

## 🚀 CI/CD Pipeline

### GitHub Actions
The project includes a complete pipeline with:

1. **Lint**: Code quality verification
2. **Build**: Application build
3. **Security**: Security audit
4. **Test**: Test execution (when implemented)
5. **Deploy**: Automatic deployment on main branch

### Workflow Triggers
- **Push** to `main` and `develop`
- **Pull Request** to `main`

## 🔒 Security

### Implemented Measures
- **Security Headers**: CSP, X-Frame-Options, etc.
- **Dependency Audit**: npm audit in CI/CD
- **Code Analysis**: njsscan for vulnerabilities
- **Environment Variables**: Secure configuration without hardcoding
- **Non-Root User**: Container runs with limited user

## 📊 Performance

### Optimizations
- **Code Splitting**: On-demand loading
- **Tree Shaking**: Removal of unused code
- **Lazy Loading**: Deferred component loading
- **Image Optimization**: Base64 support and optimized formats
- **Caching**: Static asset caching strategies

### Build Metrics
- **Bundle Size**: ~1.3MB (minified)
- **Gzip Size**: ~314KB
- **Build Time**: ~2.5s

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript conventions
2. Use ESLint to maintain consistency
3. Write tests for new critical functionality
4. Document significant changes
5. Maintain responsive design in all views

### PR Process
1. Fork the repository
2. Create feature/description branch
3. Develop with appropriate tests
4. Run `npm run lint` and `npm run build`
5. Create Pull Request with detailed description

## 📞 Support

For issues or questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with complete details

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**

[![Deploy to Coolify](https://img.shields.io/badge/Deploy%20to-Coolify-blue?style=for-the-badge)](https://coolify.io)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.10-blue?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)