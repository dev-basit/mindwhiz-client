const getEnv = (key: string, defaultValue: string): string => {
  const value = process.env[key];
  return value && value.length > 0 ? value : defaultValue;
};

export const config = {
  apiBaseUrl: getEnv("NEXT_PUBLIC_API_BASE_URL", "https://mindwhiz-backend.onrender.com/api"),
};

export type ClientConfig = typeof config;
