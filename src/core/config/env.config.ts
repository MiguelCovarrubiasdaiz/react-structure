interface EnvConfig {
  apiUrl: string;
  isDev: boolean;
  isProd: boolean;
}

export const envConfig: EnvConfig = {
  apiUrl:
    import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
