import { envs } from "@/config/envs";
import { fetchWithAuth } from "@/utils/fetchFunction";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const newUrl = new URL(request.url);
  const page = newUrl.searchParams.get('page');
  const limit = newUrl.searchParams.get('limit');
  const res = await fetchWithAuth(
    `${envs.backend}/alertas?page=${page}&limit=${limit}`,
    { method: 'GET' }
  );
    const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: data.message || 'Error al obtener alertas' },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}