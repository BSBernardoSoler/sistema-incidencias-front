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
