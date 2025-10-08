function getCookie(name) {
  if (!document.cookie) return null;
  const token = document.cookie
    .split(';')
    .map(c => c.trim())
    .find(c => c.startsWith(name + '='));
  if (!token) return null;
  return decodeURIComponent(token.split('=')[1]);
}

export function withCsrf(options = {}) {
  const headers = new Headers(options.headers || {});
  const method = (options.method || 'GET').toUpperCase();
  if (['POST','PUT','PATCH','DELETE'].includes(method)) {
    headers.set('X-CSRFToken', getCookie('csrftoken') || '');
  }
  return { ...options, headers };
}