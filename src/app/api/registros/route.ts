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