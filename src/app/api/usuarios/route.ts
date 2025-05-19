// app/api/secure/usuarios/route.ts
import { fetchWithAuth } from '../../../utils/fetchFunction';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND}/usuarios`,
    { method: 'GET' }
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: 'Error al obtener usuarios' },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
