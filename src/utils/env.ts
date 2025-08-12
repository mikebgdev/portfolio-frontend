interface EnvConfig {
  API_BASE_URL: string;
  GOOGLE_CLIENT_ID?: string;
  APP_TITLE: string;
}

const requiredEnvVars = [
  'VITE_API_BASE_URL',
  'VITE_APP_TITLE',
] as const;

function validateEnv(): EnvConfig {
  const missing: string[] = [];
  
  for (const envVar of requiredEnvVars) {
    if (!import.meta.env[envVar]) {
      missing.push(envVar);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file and ensure all required variables are set.'
    );
  }
  
  return {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    APP_TITLE: import.meta.env.VITE_APP_TITLE,
  };
}

export const env = validateEnv();