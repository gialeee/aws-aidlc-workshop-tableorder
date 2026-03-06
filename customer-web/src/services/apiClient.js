const BASE_URL = '/api';

export async function apiClient(endpoint, options = {}) {
  const sessionId = sessionStorage.getItem('sessionId');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (sessionId) headers['X-Session-Id'] = sessionId;

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `요청 실패 (${res.status})`);
  }
  return res.json();
}
