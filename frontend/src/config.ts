// API Configuration
// This file handles both local development and devtunnel URLs

const isDevelopment = import.meta.env.DEV;

// Get the backend URL from environment variable or use default
const getBackendUrl = (): string => {
  // Try to get from environment variable first
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  if (envUrl) {
    return envUrl;
  }

  // For local development, use localhost
  if (isDevelopment) {
    return 'http://localhost:5001';
  }

  // For production, we expect the env var to be set. 
  // If not, we can default to the same origin if serving from the same domain,
  // or a placeholder that indicates configuration is missing.
  return '';
};

export const API_BASE_URL = getBackendUrl();

export default {
  API_BASE_URL,
};
