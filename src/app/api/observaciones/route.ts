import { envs } from "@/config/envs";
import { fetchWithAuth } from "@/utils/fetchFunction";
import { NextResponse } from "next/server";

export async function GET( request: Request) {
  const newUrl = new URL(request.url);
  const page = newUrl.searchParams.get('page') ;
  const limit = newUrl.searchParams.get('limit') ; 
  const res = await fetchWithAuth(
    `${envs.backend}/observaciones?page=${page}&limit=${limit}`,
    { method: 'GET' }
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: 'Error al obtener observaciones' },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}