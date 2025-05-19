import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions'; // <- esta es la forma correcta
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

interface FetchWithAuthOptions extends RequestInit {
  redirectOnFail?: boolean;
}

export async function fetchWithAuth(
  input: RequestInfo | URL,
  init?: FetchWithAuthOptions
): Promise<Response> {
  const session = await getServerSession(authOptions);

  if (!session || !session.token) {
    if (init?.redirectOnFail) {
      throw new Error('No hay sesión. Redireccionar.');
    }
    throw new Error('No hay sesión activa');
  }

  const token = session.token as string;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      if (init?.redirectOnFail) {
        throw new Error('Token expirado. Redireccionar.');
      }
      throw new Error('Token expirado');
    }
  } catch (err) {
    if (init?.redirectOnFail) {
      throw new Error('Token inválido. Redireccionar.');
    }
    throw new Error('Token inválido');
  }

  const fetchOptions: RequestInit = {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  return fetch(input, fetchOptions);
}
