// app/api/secure/usuarios/route.ts
import { envs } from '@/config/envs';
import { fetchWithAuth } from '../../../../utils/fetchFunction';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dni = searchParams.get('dni') || ''; // Default to page 1 if not provided

  const res = await fetchWithAuth(
    `${envs.backend}/usuarios/dni/${dni}`,
    { method: 'GET' }
  );
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: data.message || 'Error al obtener usuario por DNI' },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}                                                                                       