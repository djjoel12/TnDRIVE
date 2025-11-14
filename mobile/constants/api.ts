// Configuration unique pour toute l'app
const getBaseUrl = () => {
  // Si on est dans un navigateur (web)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    // Cas Codespaces / app.github.dev : les URLs publiques incluent le port
    // dans le sous-domaine, ex: effective-...-8081.app.github.dev
    // Le backend est exposé sur le même sous-domaine mais avec -5000
    const codespaceMatch = hostname.match(/(.*)-\d+\.app\.github\.dev$/);
    if (codespaceMatch) {
      const baseHost = `${codespaceMatch[1]}-5000.app.github.dev`;
      return `${window.location.protocol}//${baseHost}/api`;
    }

    // Si on est sur localhost dans le navigateur, backend local
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000/api';
    }

    // Par défaut pour le web, assume backend sur même hôte + /api
    return `${window.location.protocol}//${hostname}/api`;
  }

  // En environnement non-web (build mobile ou Node), fallback
  return __DEV__ ? 'http://localhost:5000/api' : 'https://tndrive.ci/api';
};

export const API_URL = getBaseUrl();
export const API_CONFIG = { BASE_URL: API_URL };