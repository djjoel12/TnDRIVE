// Configuration unique pour toute l'app
export const API_CONFIG = {
  // En développement, utilise localhost
  BASE_URL: __DEV__ 
    ? 'http://localhost:5000/api'
    : 'https://tndrive.ci/api', // Pour la production plus tard
};

export const API_URL = API_CONFIG.BASE_URL;