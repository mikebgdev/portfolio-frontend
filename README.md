# Portfolio Frontend

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features complete API integration, dark/light theme support, and multi-language capabilities.

## Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, TailwindCSS
- **API Integration**: Complete REST API integration using RTK Query
- **Theme Support**: Dark/light mode with smooth transitions
- **Internationalization**: Multi-language support (English/Spanish)
- **Responsive Design**: Mobile-first approach with modern UI
- **State Management**: Redux Toolkit with persistence
- **Performance**: Optimized with lazy loading and caching

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router DOM
- **Persistence**: Redux Persist
- **Linting**: ESLint + TypeScript ESLint

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local`:
```env
# For development (uses Vite proxy to avoid CORS issues):
VITE_API_BASE_URL=/api/v1
VITE_APP_TITLE=Portfolio

# Update vite.config.ts proxy target to match your backend URL
```

5. Start development server
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── services/           # API services (RTK Query)
├── store/              # Redux store configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── locales/            # Translation files
└── styles/             # Global styles
```

## API Integration

The project uses RTK Query for API integration with the following endpoints:

- **About**: Personal information and bio
- **Skills**: Technical skills with categories
- **Projects**: Portfolio projects with details
- **Experience**: Work experience history
- **Education**: Educational background
- **Contact**: Contact information and message sending

## Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_APP_TITLE` - Application title
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID (optional)

## CORS Configuration

This project uses a Vite proxy in development to avoid CORS issues. The proxy is configured in `vite.config.ts`:

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://your-backend-url:8000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

For production deployment, ensure your backend is configured to allow CORS requests from your frontend domain.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
