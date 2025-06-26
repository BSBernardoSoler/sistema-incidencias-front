import { envs } from "@/config/envs";
import { fetchWithAuth } from "@/utils/fetchFunction";
import { NextResponse } from "next/server";

export async function GET(request : Request) {
     const newUrl = new URL(request.url);
    const page = newUrl.searchParams.get('page') ;
    const limit = newUrl.searchParams.get('limit') ; 
  const res = await fetchWithAuth(
    `${envs.backend}/registros?page=${page}&limit=${limit}`,
    { method: 'GET' }
  );
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: data.message || 'Error al obtener registros' },  
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}



export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetchWithAuth(
    `${envs.backend}/registros`,
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
      { message: data.message || 'Error al crear registro' },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}


export async function PUT(request: Request) {
  const body = await request.json();
  const id = body.id;
  if (!id) {
    return NextResponse.json(
      { message: 'ID de registro es requerido' },
      { status: 400 }
    );
  }
  delete body.id; // Eliminar el ID del cuerpo para evitar conflictos
  const res = await fetchWithAuth(
    `${envs.backend}/registros/${id}`,
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
      { message: data.message || 'Error al crear registro' },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}


export async function DELETE(request: Request) {
  const newUrl = new URL(request.url);
  const id = newUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json(
      { message: 'ID de registro es requerido' },
      { status: 400 }
    );
  }
  const res = await fetchWithAuth(
    `${envs.backend}/registros/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: data.message || 'Error al eliminar registro' },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}