import { envs } from "@/config/envs";
import { fetchWithAuth, fetchWithAuthwhithUserId } from "@/utils/fetchFunction";
import { NextResponse } from "next/server";

export async function GET( request: Request) {
  const newUrl = new URL(request.url);
  const id = newUrl.searchParams.get('id');

    if (!id) {
        return NextResponse.json(
        { message: 'ID de observación es requerido' },
        { status: 400 }
        );
    }
  const res = await fetchWithAuth(
    `${envs.backend}/registros/${id}`,
    { method: 'GET' }
  );
    const data = await res.json();


  if (!res.ok) {
    return NextResponse.json(
      { message: data.message || 'Error al obtener registro' },
      { status: 500 }
    );
  }

  

  return NextResponse.json(data);
}

