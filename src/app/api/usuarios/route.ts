// app/api/secure/usuarios/route.ts
import { envs } from '@/config/envs';
import { fetchWithAuth } from '../../../utils/fetchFunction';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1'; // Default to page 1 if not provided
  const limit = searchParams.get('limit') || '7'; // Default to 10 items per page if not provided

  const res = await fetchWithAuth(
    `${envs.backend}/usuarios?page=${page}&limit=${limit}`,
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


export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetchWithAuth(
    `${envs.backend}/auth/registerUser`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: data.message || 'Error al crear usuario' },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}



export async function PATCH(request: Request) {
     const { searchParams } = new URL(request.url);
     const id = searchParams.get('id');
     const body = await request.json();
     
     const res = await fetchWithAuth(
        `${envs.backend}/usuarios/${id}`,
        {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
        }
    );
    const data = await res.json();

    if (!res.ok) {
        return NextResponse.json(
        { message: data.message || 'Error al actualizar usuario' },
        { status: 500 }
        );
    }
    
    return NextResponse.json(data);

}



export async function DELETE(request: Request) {
     const { searchParams } = new URL(request.url);
     const id = searchParams.get('id');

    const res = await fetchWithAuth(
        `${envs.backend}/usuarios/${id}`,
        {
        method: 'DELETE',
        }
    );
   
    if (res.status !== 200) {
        return NextResponse.json(
        { message: 'Error al eliminar usuario' },
        { status: res.status }
        );
    }
    const data = await res.json();

    return NextResponse.json(data);

}
