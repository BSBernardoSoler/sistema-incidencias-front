import { envs } from "@/config/envs";
import { fetchWithAuth } from "@/utils/fetchFunction";
import { url } from "inspector";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const newUrl = new URL(request.url);
    const page = newUrl.searchParams.get('page') ;
    const limit = newUrl.searchParams.get('limit') ; 
  const res = await fetchWithAuth(
    `${envs.backend}/metas?page=${page}&limit=${limit}`,
    { method: 'GET' }
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: 'Error al obtener metas' },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}


export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetchWithAuth(
    `${envs.backend}/metas`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );



  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const newUrl = new URL(request.url);
  const metaId = newUrl.searchParams.get('id');

  if (!metaId) {
    return NextResponse.json(
      { message: 'ID de meta no proporcionado' },
      { status: 400 }
    );
  }

  const res = await fetchWithAuth(
    `${envs.backend}/metas/${metaId}`,
    { method: 'DELETE' }
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: 'Error al eliminar meta' },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: 'Meta eliminada correctamente' });
}


export async function PUT(request: Request) {   
  const body = await request.json();
  const metaId = body.id;
  delete body.id; // Eliminar el ID del cuerpo para no enviarlo al backend
  if (!metaId) {
    return NextResponse.json(
      { message: 'ID de meta no proporcionado' },
      { status: 400 }
    );
  }

  const res = await fetchWithAuth(
    `${envs.backend}/metas/${metaId}`,
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
      { message: data.message || 'Error al actualizar meta' },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}