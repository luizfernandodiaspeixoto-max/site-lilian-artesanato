const AUTH_SECRET = process.env.AUTH_SECRET || 'lilian-artesanato-secret-2026';
const COOKIE_NAME = 'lilian_admin_auth';
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  return atob(str.replace(/-/g, '+').replace(/_/g, '/') + pad);
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(AUTH_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

async function sign(data: string): Promise<string> {
  const key = await getKey();
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  let binary = '';
  const view = new Uint8Array(signature);
  for (let i = 0; i < view.length; i++) {
    binary += String.fromCharCode(view[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function createToken(username: string): Promise<string> {
  const payload = base64UrlEncode(JSON.stringify({ username, exp: Date.now() + TOKEN_TTL_MS }));
  const signature = await sign(payload);
  return `${payload}.${signature}`;
}

export async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expectedSignature = await sign(payload);
  if (signature !== expectedSignature) return false;
  try {
    const decoded = JSON.parse(base64UrlDecode(payload));
    if (decoded.exp && decoded.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

export function checkCredentials(username: string, password: string): boolean {
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'lilian13';
  return username === adminUser && password === adminPassword;
}

export { COOKIE_NAME };
