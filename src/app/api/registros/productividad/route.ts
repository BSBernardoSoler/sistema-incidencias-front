import { envs } from "@/config/envs";
import { fetchWithAuth } from "@/utils/fetchFunction";
import { NextResponse } from "next/server";

export async function GET(request : Request) {
  const res = await fetchWithAuth(
    `${envs.backend}/registros/productividad`,
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
