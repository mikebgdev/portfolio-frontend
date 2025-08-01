# Portfolio Frontend

## Project Overview

This is a modern, responsive personal portfolio website built with React, Vite, and Tailwind CSS. The application features a dual-theme system (light/dark mode), bilingual support (Spanish/English), and a comprehensive admin panel for content management. The portfolio showcases professional information including about section, skills, projects, experience, education, and contact details with social media integration.

The frontend is designed with a mobile-first approach, ensuring optimal user experience across all device sizes. It integrates seamlessly with a FastAPI backend for content management and Google OAuth authentication for secure admin access. The application emphasizes performance, accessibility, and user experience while maintaining clean, maintainable code architecture.

Key features include persistent theme and language preferences, responsive design, GitHub project integration, downloadable CV functionality, and a complete admin interface for content updates without requiring code changes. The application follows modern React patterns with Redux Toolkit for state management and comprehensive testing with Vitest.

## Tech Stack & Architecture

### Core Technologies
- **React 18**: Modern functional components with hooks
- **Vite**: Fast build tool and development server with HMR
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Redux Toolkit**: Predictable state management with RTK Query
- **React Router**: Client-side routing with protected routes
- **TypeScript**: Type safety and enhanced developer experience

### Architecture Patterns
The application follows a feature-based architecture with clear separation of concerns:

```
src/
├── components/          # Shared UI components
├── features/           # Feature-specific modules
│   ├── about/
│   ├── skills/
│   ├── projects/
│   ├── experience/
│   ├── education/
│   ├── contact/
│   └── admin/
├── hooks/              # Custom React hooks
├── store/              # Redux store and slices
├── styles/             # Global styles and design tokens
└── utils/              # Utility functions
```

### State Management Strategy
- **Local State**: Component-specific data (form inputs, UI state)
- **Global State**: Theme preferences, language settings, authentication
- **Server State**: API data with RTK Query for caching and synchronization

### Design System
The application implements a comprehensive design token system with CSS variables for theming:
- Color tokens for light/dark mode switching
- Spacing scale for consistent layout
- Typography system with responsive font sizes
- Border radius and shadow utilities

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn
- Git for version control
- Modern web browser for development

### Local Development Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio-frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Configuration**
Create a `.env.local` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_APP_TITLE=Portfolio
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Docker Development Setup

1. **Build Docker image**
```bash
docker build -t portfolio-frontend .
```

2. **Run container**
```bash
docker run -p 3000:3000 portfolio-frontend
```

### Production Build

1. **Create production build**
```bash
npm run build
```

2. **Preview production build locally**
```bash
npm run preview
```

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build
- `npm run test`: Run unit tests
- `npm run test:watch`: Run tests in watch mode
- `npm run coverage`: Generate test coverage report
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint issues automatically

## Implementation Guide

### Component Development

#### Theme System Implementation
```tsx
// hooks/useTheme.ts
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';

export const useTheme = () => {
  const theme = useSelector((state) => state.theme.current);
  const dispatch = useDispatch();

  const toggle = () => dispatch(toggleTheme());

  return { theme, toggle };
};

// components/ThemeToggle.tsx
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
```

#### Language System Implementation
```tsx
// hooks/useLanguage.ts
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../store/languageSlice';

export const useLanguage = () => {
  const language = useSelector((state) => state.language.current);
  const dispatch = useDispatch();

  const changeLanguage = (lang: 'en' | 'es') => {
    dispatch(setLanguage(lang));
  };

  const t = (key: string) => {
    // Translation logic here
    return translations[language][key] || key;
  };

  return { language, changeLanguage, t };
};
```

#### Project Card Component
```tsx
// components/ProjectCard.tsx
interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl: string;
  demoUrl?: string;
  technologies: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  githubUrl,
  demoUrl,
  technologies
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex gap-2">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
        >
          GitHub
        </a>
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Demo
          </a>
        )}
      </div>
    </div>
  );
};
```

### State Management Setup

#### Redux Store Configuration
```tsx
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeSlice from './themeSlice';
import languageSlice from './languageSlice';
import authSlice from './authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme', 'language']
};

const rootReducer = combineReducers({
  theme: themeSlice,
  language: languageSlice,
  auth: authSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
```

### Routing Implementation
```tsx
// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
```

### Responsive Design Implementation
```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary-light: #3b82f6;
  --color-primary-dark: #60a5fa;
  --color-bg-light: #ffffff;
  --color-bg-dark: #111827;
  --color-text-light: #111827;
  --color-text-dark: #f9fafb;
}

@layer components {
  .container-responsive {
    @apply container mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  .section-padding {
    @apply py-12 sm:py-16 lg:py-20;
  }
}
```

## API Integration & Component Documentation

### API Service Layer
```tsx
// services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const portfolioApi = createApi({
  reducerPath: 'portfolioApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['About', 'Skills', 'Projects', 'Experience', 'Education'],
  endpoints: (builder) => ({
    getAbout: builder.query<AboutData, void>({
      query: () => 'about',
      providesTags: ['About'],
    }),
    updateAbout: builder.mutation<AboutData, Partial<AboutData>>({
      query: (data) => ({
        url: 'about',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['About'],
    }),
    getSkills: builder.query<Skill[], void>({
      query: () => 'skills',
      providesTags: ['Skills'],
    }),
    // Additional endpoints...
  }),
});

export const {
  useGetAboutQuery,
  useUpdateAboutMutation,
  useGetSkillsQuery,
} = portfolioApi;
```

### Component Props Interfaces
```tsx
// types/components.ts
export interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface LanguageToggleProps {
  className?: string;
  showLabels?: boolean;
}

export interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    githubUrl: string;
    demoUrl?: string;
    technologies: string[];
    imageUrl?: string;
  };
  onEdit?: (id: string) => void;
  isEditable?: boolean;
}

export interface SkillBadgeProps {
  skill: {
    id: string;
    name: string;
    type: 'technical' | 'interpersonal';
    level?: number;
  };
  variant?: 'default' | 'outlined';
}
```

### Error Handling Components
```tsx
// components/ErrorBoundary.tsx
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Loading States
```tsx
// components/LoadingSkeleton.tsx
export const ProjectCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
    <div className="flex gap-2 mb-4">
      <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
    <div className="flex gap-2">
      <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
  </div>
);
```

## Testing & Deployment

### Unit Testing Examples
```tsx
// components/__tests__/ThemeToggle.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ThemeToggle } from '../ThemeToggle';

describe('ThemeToggle', () => {
  it('renders theme toggle button', () => {
    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('toggles theme on click', () => {
    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Assert theme change
    expect(store.getState().theme.current).toBe('dark');
  });
});
```

### Production Deployment
The application is optimized for production deployment with:
- Code splitting for optimal bundle sizes
- Asset optimization and compression
- Service worker for offline functionality
- CDN-ready static asset serving

Build the application for production:
```bash
npm run build
```

The `dist` folder contains the production-ready application that can be served by any static file server or deployed to platforms like Vercel, Netlify, or AWS S3.